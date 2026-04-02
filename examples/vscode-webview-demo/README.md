# vscode-webview-demo

Minimal demo project to test `easy-vscode` runtime and extension/webview messaging.

Step-by-step verification: [TESTING.md](./TESTING.md).

## What this demo covers

- Open webview from an extension command.
- Send messages from webview to extension.
- Receive callback data from extension in webview.

## Quick start

1. Install dependencies (semver ranges resolve from npm; bump when you publish new majors):
   - `yarn`
2. **Inside this monorepo only**: overlay your checkout of `packages/core` and `packages/webview` into `node_modules` (needed to test unpublished API changes):
   - `yarn prepare:easy-vscode`
3. Vendor template assets into `scaffold/bundler/` (first run or after template updates):
   - `yarn vendor:template`
   - Force overwrite: `yarn vendor:template -- --force`
   - See details in [WEBVIEW_USER.md](./WEBVIEW_USER.md) and [scaffold/README.md](./scaffold/README.md).
4. Build webview + extension:
   - `yarn package`
5. Press `F5` in this project.
6. In Extension Development Host, run command:
   - `Open Webview Demo`

## Monorepo: editing `packages/core` or `packages/webview`

`yarn prepare:easy-vscode` **does not** run on file save. It copies or refreshes what ends up under `node_modules/@easy_vscode/*`.

- **Only editing this example** (`src/`, templates, webpack): run `yarn watch` / `yarn package` as usual. No need to rerun `prepare`.
- **Editing upstream `packages/core` or `packages/webview`**: run **`yarn prepare:easy-vscode` again** after those changes (or before `F5`) so `node_modules` matches your working tree.

Optional workflows so you do not forget:

1. **`yarn link` (good for a focused session)**  
   In `packages/core` / `packages/webview` run `yarn link`, then in this example `yarn link @easy_vscode/core` and `yarn link @easy_vscode/webview`. Undo with `yarn unlink` when you are done. (Watch for duplicate React issues if versions diverge.)

2. **Second terminal: TypeScript watch on `.js` output**  
   From `packages/core`, run a **one-shot build** once, then keep `tsc` rebuilding `lib/` (e.g. `node ../../node_modules/typescript/bin/tsc --build tsconfig.json --watch` from `packages/core`). After each successful emit you still need **`yarn prepare:easy-vscode`** (or a small copy/sync script), because this example is not wired to read `packages/core/lib` directly from disk—unless you use `yarn link` / a symlink yourself.

There is no need to switch `package.json` between `file:` and semver: keep semver in git; use `prepare:easy-vscode` or `yarn link` when you hack on the libraries.

## Message tests

- **Send PING**: expect a `pong` response from extension.
- **Get Extension Info**: expect extension path, workspace path, and VS Code version.
