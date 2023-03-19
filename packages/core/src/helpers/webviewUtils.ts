import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { commands, ExtensionContext, Uri, Webview, WebviewPanel, WebviewView, window, env } from 'vscode'
import { BUILTIN_MESSAGE_CMD } from '../constants'
import * as utils from './utils'
import { IMessage, IWebview } from '../types'

const { logInfo } = utils

export type WebviewContainer = WebviewPanel

/**
 * all webview panels, only one panel of the same viewType exists at the same time
 */
const panels = new Map<string, WebviewContainer>()

let _sidebar: WebviewView | null = null
export const setSidebarWebview = (sidebarWebview: WebviewView) => {
  _sidebar = sidebarWebview
}

/**
 * all message handlers
 */
const messageCenter: Map<string, (message: IMessage, webview: Webview) => any> = new Map([
  [
    BUILTIN_MESSAGE_CMD.EXECUTE_SPECIFIC_COMMAND,
    (message: IMessage) => {
      commands.executeCommand(message.data.command)
    }
  ],
  [
    BUILTIN_MESSAGE_CMD.EXECUTE_CHILD_PROCESS,
    (message: IMessage) => {
      exec(message.data.command)
    }
  ],
  [
    BUILTIN_MESSAGE_CMD.LOG_INFO,
    (message: IMessage) => {
      utils.logInfo(message.data.info)
    }
  ]
])

export const handleWebviewMessage = (message: IMessage, webview: Webview) => {
  logInfo('receive msg：' + JSON.stringify(message))
  const handler = messageCenter.get(message.cmd)
  if (handler) {
    handler(message, webview)
  } else {
    utils.showError(`Handler function "${message.cmd}" doesn't exist!`)
  }
}

/**
 * load html as string from files
 * @param {*} context context of extension
 * @param {*} templatePath relative path
 */
export const getWebViewContent = (context: ExtensionContext, templatePath: string, webview: Webview) => {
  const resourcePath = utils.getExtensionFileAbsolutePath(context, templatePath)
  const dirPath = path.dirname(resourcePath)
  let html = fs.readFileSync(resourcePath, 'utf-8')
  // need to convert paths according to the rules of vscode
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m: any, $1: string, $2: string) => {
    utils.logInfo(`webview-replace resourcePath:${resourcePath} dirPath:${dirPath} $1:${$1} $2:${$2}`)
    $2 = $2.startsWith('.') ? $2 : '.' + $2
    const vscodeResourcePath = webview.asWebviewUri(Uri.file(path.resolve(dirPath, $2))).toString()
    console.log('vscodeResourcePath:', vscodeResourcePath)
    return $1 + vscodeResourcePath + '"'
  })
  return html
}

/**
 * invoke callback
 * @param {string} viewType
 * @param {*} message
 * @param {*} response
 */
export const invokeCallback = (viewType: string, message: IMessage, response: any = null) => {
  if (response && typeof response === 'object' && response.code && response.code >= 400 && response.code < 600) {
    utils.showError(response.message || 'unknown error!')
  }
  const panel = panels.get(viewType)
  if (panel) {
    panel.webview.postMessage({ cmd: 'vscodeCallback', callbackId: message.callbackId, data: response })
  } else if (_sidebar) {
    _sidebar.webview.postMessage({ cmd: 'vscodeCallback', callbackId: message.callbackId, data: response })
  } else {
    utils.showError(`Could not find a panel has viewType ${viewType}!`)
  }
}

export const successResp = { code: 0, text: 'success!' }

const addMessageHandler = (messageHandlers: Map<string, (message: IMessage, webview: Webview) => any>) => {
  messageHandlers.forEach(function (value, key) {
    if (messageCenter.get(key)) {
      utils.showError(`Message handler named ${key} already exists!`)
    }
    messageCenter.set(key, value)
    logInfo(`register message handler ${key}`)
  })
}

const getEnvForWebview = () => {
  return {
    language: env.language
  }
}

export const registryWebview = function (context: ExtensionContext, webview: IWebview) {
  const { webviewProps, messageHandlers } = webview
  const { command, htmlPath, currentView, panelParams, iconPath } = webviewProps
  const { viewType, title, showOptions, options } = panelParams
  const registerHandle = commands.registerCommand(command, function (...args) {
    const projectPath = utils.getProjectPath()
    if (!projectPath) {
      utils.showInfo('Please open any folder before executing this extension')
      return
    }
    logInfo('viewType: ' + viewType)
    let panel = panels.get(viewType)
    logInfo('webviewProps: ' + JSON.stringify(webviewProps))
    if (panel) {
      panel.reveal()
      const func: any = messageCenter.get(BUILTIN_MESSAGE_CMD.REVEAL_WEBVIEW)
      if (func && typeof func === 'function') {
        func({ commandArgs: args })
      }
      return
    }
    panel = window.createWebviewPanel(viewType, title, showOptions, options)
    if (!panel) {
      return
    }
    panel.iconPath = Uri.file(context.asAbsolutePath(iconPath || 'assets/logo.svg'))
    panel.webview.html = getWebViewContent(context, htmlPath, panel.webview)
    panel.webview.html = panel.webview.html.replace('$currentView$', currentView)
    panel.webview.html = panel.webview.html.replace('$vscodeEnv$', JSON.stringify(getEnvForWebview()))
    panel.webview.html = panel.webview.html.replace('$commandArgs$', JSON.stringify(args));
    // console.log('panel.webview.html:', panel.webview.html)
    const handleReceiveMessage = (msg: IMessage) => panel && handleWebviewMessage(msg, panel.webview)
    panel.webview.onDidReceiveMessage(handleReceiveMessage, undefined, context.subscriptions)
    panels.set(viewType, panel)
    // Reset when the current panel is closed
    panel.onDidDispose(
      () => {
        panels.delete(viewType)
        panel?.dispose()
      },
      null,
      context.subscriptions
    )
  })
  context.subscriptions.push(registerHandle)
  addMessageHandler(messageHandlers)
}
