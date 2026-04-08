import * as vscode from 'vscode'
import { utils, webviewUtils } from '@easy_vscode/core'
import { IMessage, IWebviewProps, IWebview } from '@easy_vscode/core/lib/types'
import { DIST_WEBVIEW_INDEX_HTML, EXTENSION_COMMANDS, MESSAGE_CMD, WEBVIEW_NAMES } from '../constants'

const { invokeCallback } = webviewUtils

const viewType = WEBVIEW_NAMES.DemoPanel
const webviewProps: IWebviewProps = {
  command: EXTENSION_COMMANDS.OPEN_DEMO,
  htmlPath: DIST_WEBVIEW_INDEX_HTML,
  currentView: viewType,
  panelParams: {
    viewType,
    title: 'Webview Demo',
    showOptions: vscode.ViewColumn.One,
    options: {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  }
}

const messageHandlers = new Map([
  [
    MESSAGE_CMD.PING,
    (message: IMessage, webview: vscode.Webview) => {
      invokeCallback(viewType, message, {
        code: 0,
        text: 'pong',
        from: 'extension',
        timestamp: Date.now()
      }, webview)
    }
  ],
  [
    MESSAGE_CMD.GET_EXT_INFO,
    (message: IMessage, webview: vscode.Webview) => {
      invokeCallback(viewType, message, {
        code: 0,
        extensionPath: utils.envVars.extensionPath,
        workspacePath: utils.getProjectPath(),
        vscodeVersion: vscode.version
      }, webview)
    }
  ]
])

const webview: IWebview = { webviewProps, messageHandlers }

export default webview

