import * as vscode from 'vscode'
import { utils, init, workspaceStorage, globalStorage } from '@easy-vscode/core'
import { registryAllWebviews } from './webviewController'
import * as path from 'path'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  init(context)
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "Image Viewer" is now active!')
  utils.envVars.extensionPath = path.join(context.extensionPath, './')
  registryAllWebviews(context)

  /* storage */
  // storage.update('a', 123)
  // workspaceStorage.update('onlySetInEasyVscode', 'ONLY_SET_IN_EASY_VSCODE')
  const workspaceStorageKeys = workspaceStorage.keys()
  console.log('workspaceStorageKeys:', workspaceStorageKeys)
  // globalStorage.update('global_onlySetInEasyVscode', 'GLOBAL_ONLY_SET_IN_EASY_VSCODE')
  const globalStorageKeys = globalStorage.keys()
  console.log('globalStorageKeys:', globalStorageKeys)

}

// this method is called when your extension is deactivated
export function deactivate() {}
