# vscode-webview-demo

Minimal demo project to test `easy-vscode` runtime and extension/webview messaging.

Step-by-step verification: [TESTING.md](./TESTING.md).

## What this demo covers

- Open webview from extension command.
- Send messages from webview to extension.
- Return callback data from extension to webview.

## Quick start

1. Build local core package:
   - `yarn prepare:easy-vscode`
2. Install dependencies:
   - `yarn`
3. **（首次或更新模板）** 将上游模板拷入 `scaffold/bundler/`：
   - `yarn vendor:template`
   - 覆盖已有内容：`yarn vendor:template -- --force`  
   - 说明见 [WEBVIEW_USER.md](./WEBVIEW_USER.md)、[scaffold/README.md](./scaffold/README.md)。
4. Build webview + extension:
   - `yarn package`
4. Press `F5` in this project.
5. In Extension Development Host, run command:
   - `Open Webview Demo`

## Message tests

- **Send PING**: expect `pong` response from extension.
- **Get Extension Info**: expect extension path, workspace path, and VS Code version.

