import { ExtensionContext } from 'vscode'
import * as constants from './constants'
import * as utils from './helpers/utils'
import * as vscode from './helpers/vscode'
import * as webviewUtils from './helpers/webviewUtils'
import * as workspaceStorage from './storage/workspaceStorage'
import * as globalStorage from './storage/globalStorage'

let extensionContext: ExtensionContext
export const init = (context: ExtensionContext) => {
    extensionContext = context
}

export const getExtensionContext = (): ExtensionContext => {
    return extensionContext
}

export {
    constants,
    utils,
    vscode,
    webviewUtils,
    workspaceStorage,
    globalStorage,
}