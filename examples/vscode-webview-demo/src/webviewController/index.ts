import { ExtensionContext } from 'vscode'
import { webviewUtils } from '@easy_vscode/core'
import demoWebview from './simpleDemo'

const { registryWebview } = webviewUtils

export const registryAllWebviews = (context: ExtensionContext) => {
  registryWebview(context, demoWebview)
}

