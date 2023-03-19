/* eslint-disable @typescript-eslint/naming-convention */

export const DIST_WEBVIEW_PATH = 'distWebview'
export const DIST_WEBVIEW_INDEX_HTML = `${DIST_WEBVIEW_PATH}/index.html`

export const NATIVE_CMD = {
  WORKBENCH_ACTION_OPEN_SNIPPETS: 'workbench.action.openSnippets'
}

// prevent duplicate CMDs
export const BUILTIN_MESSAGE_CMD = {
  /* Common */
  EXECUTE_SPECIFIC_COMMAND: 'executeSpecificCommand',
  EXECUTE_CHILD_PROCESS: 'executeChildProcess',
  LOG_INFO: 'logInfo', // log for debug
  REVEAL_WEBVIEW: 'revealWebview',
}
