/* eslint-disable @typescript-eslint/naming-convention */

export const DIST_WEBVIEW_PATH = 'distWebview'
export const DIST_WEBVIEW_INDEX_HTML = `${DIST_WEBVIEW_PATH}/index.html`

export const WEBVIEW_NAMES = {
  PreviewImages: 'PreviewImages',
}

export const NATIVE_CMD = {
  WORKBENCH_ACTION_OPEN_SNIPPETS: 'workbench.action.openSnippets'
}

// prevent duplicate CMDs
export const MESSAGE_CMD = {
  /* Common */
  EXECUTE_SPECIFIC_COMMAND: 'executeSpecificCommand',
  EXECUTE_CHILD_PROCESS: 'executeChildProcess',
  LOG_INFO: 'logInfo', // log for debug

  /* imagePreview */
  GET_ALL_IMGS: 'getAllImgs',
  RENAME_FILE: 'renameFile',
  DELETE_FILE: 'deleteFile',
  OPEN_IMAGE_DIRECTORY: 'openImageDirectory',
  GET_IMAGE_BASE64: 'getImageBase64',
}

export const SUPPORT_IMG_TYPES = ['.svg', '.png', '.jpeg', '.jpg', '.ico', '.gif', '.webp', '.bmp', '.tif', '.apng']

export const EXTENSION_NAME = 'vscode-infra'

export const EXTENSION_COMMANDS = {
  OPEN_WEBVIEW_IMAGE_VIEWER: `${EXTENSION_NAME}.webviewImageViewer`,
}