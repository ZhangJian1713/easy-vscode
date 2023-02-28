import * as React from 'react'
import { render } from 'react-dom'
import App from './src/App'
import i18n, { i18next } from '@easy-vscode/i18n'

export * from './src/helpers/callVscode'

interface IWebviewComponents {
  [componentName: string]: React.FC
}

export const registerWebview = function (webviewComponents: IWebviewComponents) {
  const vscodeEnv = (window as any).vscodeEnv
  const lng = vscodeEnv.language || 'en'
  i18next.then(() => {
    i18n.changeLanguage(lng,()=>{
      render(<App components={webviewComponents} />, document.getElementById('root'))
    })
  })
}
