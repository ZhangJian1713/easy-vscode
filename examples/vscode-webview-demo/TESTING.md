# Verification Guide (vscode-webview-demo)

## Prerequisites

- Open folder `easy-vscode/examples/vscode-webview-demo` directly in VS Code / Cursor.
- Node.js and Yarn are installed.
- This example lives inside the `easy-vscode` repo, so `yarn vendor:template` resolves templates from the local `webview-templates/` directory. For custom layouts, set `EASY_VSCODE_ROOT`.
- If you use `file:../../packages/core`, build core `lib` first:
  `yarn prepare:easy-vscode`

## Checklist

1. Install dependencies:
   `yarn`

2. Vendor template files into `scaffold/bundler/` (first run or template changes):
   `yarn vendor:template`
   Force overwrite: `yarn vendor:template -- --force`

3. Build webview + extension host:
   `yarn package` (uses `scaffold/webview.webpack.js`)

   Expected outputs:
   - `distWebview/index.html` (plus `app*.js` artifacts)
   - `dist/extension.js`

4. Optional type check:
   `yarn check-type`

## UI test in editor

1. Select launch config **Run Webview Demo Extension** (runs `demo:package` task, equivalent to `yarn package`).
2. Press `F5` to open Extension Development Host.
3. Open command palette and run: `Open Webview Demo`.
4. Click **Send PING** / **Get Extension Info** in the panel and verify JSON responses in logs.

## Troubleshooting

| Symptom | Fix |
|------|------|
| `command 'webview-demo.open' not found` | Ensure workspace root is `examples/vscode-webview-demo`; run `yarn package`; press `F5` again. |
| `@easy_vscode/core` cannot find `lib` | Run `yarn prepare:easy-vscode`. |
| Missing `scaffold/bundler/webpack.factory.js` | Run `yarn vendor:template`. |

## Verified in this environment

`yarn package` succeeds and generates `distWebview` and `dist/extension.js` in current repo state.
