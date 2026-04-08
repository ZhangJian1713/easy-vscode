import * as vscode from 'vscode'

export interface ICreatePanelParams {
  // Identifies the type of the webview panel.
  viewType: string
  // Title of the panel.
  title: string
  // Where to show the webview in the editor. If preserveFocus is set, the new webview will not take focus.
  showOptions:
  | vscode.ViewColumn
  | {
    viewColumn: vscode.ViewColumn
    preserveFocus?: boolean | undefined
  }
  // Settings for the new panel.
  options?: (vscode.WebviewPanelOptions & vscode.WebviewOptions) | undefined
}

/** Allows multiple side-by-side webviews under the same `viewType` (e.g. one instance per folder from the Explorer context menu). */
export interface IWebviewMultiPanelOptions {
  /** Dedupe and reuse panels; running the command again with the same key reveals the existing panel (which receives REVEAL). */
  instanceKeyFromCommandArgs: (args: unknown[], projectPath: string) => string
  /** Tab title; `defaultTitle` comes from `panelParams.title`. */
  resolvePanelTitle: (args: unknown[], projectPath: string, defaultTitle: string) => string
}

export interface IWebviewProps {
  // command to active this webview panel
  command: string
  // webview static files
  htmlPath: string
  // View id to be show, link to inner webview project
  currentView: string
  // all need options to create this webview panel
  panelParams: ICreatePanelParams
  // panel icon path
  iconPath?: string
  /** When set: one panel per instance; when unset, behaves like the fixed instance `__default__`. */
  multiPanel?: IWebviewMultiPanelOptions
}

export interface IMessage {
  msgId: string
  cmd: string
  postTime: string
  callbackId: string
  data: any
}

export type MessageCallback = (data: any) => void

export interface IWebview {
  webviewProps: IWebviewProps
  messageHandlers: Map<string, (message: IMessage, webview: vscode.Webview) => any>
}
