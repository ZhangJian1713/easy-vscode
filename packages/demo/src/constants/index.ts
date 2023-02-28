/* eslint-disable @typescript-eslint/naming-convention */

export const DIST_WEBVIEW_PATH = 'distWebview'
export const DIST_WEBVIEW_INDEX_HTML = `${DIST_WEBVIEW_PATH}/index.html`

// you can change this to you publisher group
export const PUBLISHER_ID = 'vscode-infra'

export const EXTENSION_COMMANDS = {
  OPEN_WEBVIEW_IMAGE_VIEWER: `${PUBLISHER_ID}.webviewImageViewer`,
  OPEN_WEBVIEW_HELLO_WORLD: `${PUBLISHER_ID}.webviewHelloWorld`,
}

export const WEBVIEW_NAMES = {
  PreviewImages: 'PreviewImages',
  HelloWorld: 'HelloWorld',
}

export const MESSAGE_CMD = {
  // image viewer
  GET_ALL_IMGS: 'getAllImgs',
  RENAME_FILE: 'renameFile',
  DELETE_FILE: 'deleteFile',
  OPEN_IMAGE_DIRECTORY: 'openImageDirectory',
  GET_IMAGE_BASE64: 'getImageBase64',

  // hello world
  LIST_FILES: 'listFiles'
}
