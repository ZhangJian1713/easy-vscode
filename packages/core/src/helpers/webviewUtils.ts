import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { commands, ExtensionContext, Uri, Webview, WebviewPanel, WebviewView, window, env, workspace } from 'vscode'
import { BUILTIN_MESSAGE_CMD } from '../constants'
import * as utils from './utils'
import { IMessage, IWebview } from '../types'

const { logInfo } = utils

export type WebviewContainer = WebviewPanel

/**
 * Map key is `${viewType}\x1e${instanceKey}` with multiple instances, or `${viewType}\x1e__default__` for a single instance.
 */
const panels = new Map<string, WebviewContainer>()

const PANEL_KEY_SEP = '\x1e'

function panelMapKey(viewType: string, instanceKey: string): string {
  return `${viewType}${PANEL_KEY_SEP}${instanceKey}`
}

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
    return $1 + vscodeResourcePath + '"'
  })
  return html
}

/**
 * Posts the callback result to the webview that initiated the RPC.
 * @param viewType Webview panel type.
 * @param message Original message (contains `callbackId`).
 * @param response Response payload.
 * @param targetWebview With multiple panels: pass the webview that initiated the RPC. With a single panel: optional; falls back to `viewType` + `__default__`.
 */
export const invokeCallback = (
  viewType: string,
  message: IMessage,
  response: any = null,
  targetWebview?: Webview
) => {
  if (response && typeof response === 'object' && response.code && response.code >= 400 && response.code < 600) {
    utils.showError(response.message || 'unknown error!')
  }
  if (targetWebview) {
    targetWebview.postMessage({ cmd: 'vscodeCallback', callbackId: message.callbackId, data: response })
    return
  }
  const fallback = panels.get(panelMapKey(viewType, '__default__'))
  if (fallback) {
    fallback.webview.postMessage({ cmd: 'vscodeCallback', callbackId: message.callbackId, data: response })
    return
  }
  if (_sidebar) {
    _sidebar.webview.postMessage({ cmd: 'vscodeCallback', callbackId: message.callbackId, data: response })
    return
  }
  utils.showError(`Could not find a panel has viewType ${viewType}!`)
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
  const { command, htmlPath, currentView, panelParams, iconPath, multiPanel } = webviewProps
  const { viewType, title, showOptions, options } = panelParams
  const registerHandle = commands.registerCommand(command, function (...args) {
    const projectPath = utils.getProjectPath()
    if (!projectPath) {
      utils.showInfo('Please open any folder before executing this extension')
      return
    }
    logInfo('viewType: ' + viewType)
    const instanceKey = multiPanel?.instanceKeyFromCommandArgs(args, projectPath) ?? '__default__'
    const storageKey = panelMapKey(viewType, instanceKey)
    const panelTitle = multiPanel?.resolvePanelTitle(args, projectPath, title) ?? title
    let panel = panels.get(storageKey)
    logInfo('webviewProps: ' + JSON.stringify(webviewProps))
    if (panel) {
      panel.reveal()
      panel.title = panelTitle
      panel.webview?.postMessage({ cmd: BUILTIN_MESSAGE_CMD.REVEAL_WEBVIEW, data: { commandArgs: args } })
      return
    }
    // Custom `localResourceRoots` replace the default roots; include the extension dir, globalStorage (e.g. thumbnail cache), and each workspace folder.
    const workspaceFolderUris = workspace.workspaceFolders?.map((f) => f.uri) ?? []
    const mergedResourceRoots = [
      context.extensionUri,
      context.globalStorageUri,
      ...workspaceFolderUris,
      ...(options?.localResourceRoots ?? [])
    ]
    panel = window.createWebviewPanel(viewType, panelTitle, showOptions, {
      ...options,
      localResourceRoots: mergedResourceRoots
    })
    if (!panel) {
      return
    }
    panel.iconPath = Uri.file(context.asAbsolutePath(iconPath || 'assets/logo.svg'))
    panel.webview.html = getWebViewContent(context, htmlPath, panel.webview)
    panel.webview.html = panel.webview.html.replace('$currentView$', currentView)
    panel.webview.html = panel.webview.html.replace('$vscodeEnv$', JSON.stringify(getEnvForWebview()))
    panel.webview.html = panel.webview.html.replace('$commandArgs$', JSON.stringify(args))
    const handleReceiveMessage = (msg: IMessage) => panel && handleWebviewMessage(msg, panel.webview)
    panel.webview.onDidReceiveMessage(handleReceiveMessage, undefined, context.subscriptions)
    panels.set(storageKey, panel)
    // Reset when the current panel is closed
    panel.onDidDispose(
      () => {
        panels.delete(storageKey)
        panel?.dispose()
      },
      null,
      context.subscriptions
    )
  })
  context.subscriptions.push(registerHandle)
  addMessageHandler(messageHandlers)
}
