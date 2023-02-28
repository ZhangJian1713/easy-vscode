import { ViewColumn } from 'vscode'
import { DIST_WEBVIEW_INDEX_HTML, EXTENSION_COMMANDS, MESSAGE_CMD, WEBVIEW_NAMES } from '../../constants'
import { IWebview, IWebviewProps, IMessage } from '@easy-vscode/core/lib/types'
import { webviewUtils } from '@easy-vscode/core'
import { exec } from 'child_process'

const { invokeCallback } = webviewUtils

const viewType = WEBVIEW_NAMES.HelloWorld
const webviewProps: IWebviewProps = {
  command: EXTENSION_COMMANDS.OPEN_WEBVIEW_HELLO_WORLD,
  htmlPath: DIST_WEBVIEW_INDEX_HTML,
  currentView: WEBVIEW_NAMES.HelloWorld,
  panelParams: {
    viewType,
    title: 'Hello World',
    showOptions: ViewColumn.One,
    options: {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  },
  iconPath: 'assets/logo.png'
}

const messageHandlers = new Map([
  [
    MESSAGE_CMD.LIST_FILES,
    (message: IMessage) => {
      exec('ls', (error, stdout) => {
        if (error) {
          console.error('LIST_FILES error:', error)
          return
        }
        console.log('LIST_FILES stdout:', stdout)
        invokeCallback(viewType, message, stdout)
      })
    }
  ]
])

const webview: IWebview = { webviewProps, messageHandlers }
export default webview
