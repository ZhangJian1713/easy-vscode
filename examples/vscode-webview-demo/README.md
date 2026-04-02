# vscode-webview-demo

Minimal demo project to test `easy-vscode` runtime and extension/webview messaging.

Step-by-step verification: [TESTING.md](./TESTING.md).

## What this demo covers

- Open webview from an extension command.
- Send messages from webview to extension.
- Receive callback data from extension in webview.

## Quick start

1. Build local core package:
   - `yarn prepare:easy-vscode`
2. Install dependencies:
   - `yarn`
3. Vendor template assets into `scaffold/bundler/` (first run or after template updates):
   - `yarn vendor:template`
   - Force overwrite: `yarn vendor:template -- --force`
   - See details in [WEBVIEW_USER.md](./WEBVIEW_USER.md) and [scaffold/README.md](./scaffold/README.md).
4. Build webview + extension:
   - `yarn package`
5. Press `F5` in this project.
6. In Extension Development Host, run command:
   - `Open Webview Demo`

## Message tests

- **Send PING**: expect a `pong` response from extension.
- **Get Extension Info**: expect extension path, workspace path, and VS Code version.
