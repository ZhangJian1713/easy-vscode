# Webview package split matrix

## Problem

`@easy_vscode/webview` previously bundled a full frontend app (Ant Design root, i18n init, global CSS, webpack config). That couples React/Antd/Less versions to the runtime and blocks users from owning their bundler.

## Target split

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Runtime** | `packages/webview` (`@easy_vscode/webview`) | `registerWebview(components, options?)`, `callVscode`, message typing for IPC |
| **Frontend app** | `webview-templates/*` | `webpack.factory.js`, `index.html`, favicon, global CSS, optional `AntdWebviewShell` sample |
| **Consumer** | Your extension | Business in `src/`; tooling in **`scaffold/`** (`webview.webpack.js`, `bundler/`). Legacy projects may use `easyVscodeConfig/`; root `.babelrc` and `package.json` |

## What moved out of `packages/webview`

| Removed from package | New home |
|---------------------|----------|
| `webpack.webview.js` | `webview-templates/antd-less/webpack.factory.js` or `minimal-react/webpack.factory.js` |
| `src/App.tsx` (Ant Design `ConfigProvider`) | Consumer `AntdWebviewShell.tsx` + template `AntdWebviewShell.sample.tsx` |
| `src/global.css` (Ant tweaks) | `webview-templates/antd-less/src/global.antd.css` → consumer `antd-global.css` |
| `src/index.html`, favicon | `webview-templates/*/src/` |
| i18n bootstrap inside `registerWebview` | Consumer imports i18n before `registerWebview` (e.g. demo) |
| Dead code (`common-styles`, `fetch.ts`, assets) | Dropped |

## Consumer API change

`registerWebview` now accepts an optional root:

```ts
registerWebview(components, { Root: AntdWebviewShell })
```

Default root mounts the selected view only (no Ant Design).

## npm publishing note

Templates are **not** inside `@easy_vscode/webview` on npm. Publish flow: copy `webview-templates` from this repo into your extension, or vendor the factory file only.

## Breaking change (v2)

`@easy_vscode/webview@2.x` removes `webpack.webview.js`. Use `webview-templates/antd-less/webpack.factory.js` or `minimal-react/webpack.factory.js` instead. `registerWebview` gains optional `{ Root }` for Ant Design shells.
