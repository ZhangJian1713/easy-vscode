import { ExtensionContext } from 'vscode'
import imagesViewer from './imagesViewer'
import helloWorld from './helloWorld'
import { webviewUtils } from '@easy-vscode/core'

const { registryWebview } = webviewUtils

export const registryAllWebviews = function (context: ExtensionContext) {
  registryWebview(context, imagesViewer)
  registryWebview(context, helloWorld)
}
