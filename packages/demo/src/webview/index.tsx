import { registerWebview } from '@easy_vscode/webview'
import HelloWorld from './HelloWorld'
import PreviewImages from './PreviewImages'
import '../i18n'

const webviewComponents = {
  HelloWorld,
  PreviewImages
}

registerWebview(webviewComponents)
