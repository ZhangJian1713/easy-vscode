import * as path from 'path'
import * as vscode from 'vscode'
import { utils } from '@easy_vscode/core'
import { registryAllWebviews } from './webviewController'

const { envVars } = utils

export function activate(context: vscode.ExtensionContext) {
  envVars.extensionPath = path.join(context.extensionPath, './')
  registryAllWebviews(context)
}

export function deactivate() {}

