import { registerWebview } from '@easy_vscode/webview'
import HelloWorld from './HelloWorld'
import PreviewImages from './PreviewImages'
import '../i18n'
import { AntdWebviewShell } from './AntdWebviewShell'

const webviewComponents = {
  HelloWorld,
  PreviewImages
}

registerWebview(webviewComponents, { Root: AntdWebviewShell })
