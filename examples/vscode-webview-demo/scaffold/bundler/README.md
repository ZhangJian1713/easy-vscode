# minimal-react webview template

Use this when you only need **React + CSS** (no Ant Design, no Less).

When copied into an extension repo, this folder commonly lives at **`scaffold/bundler/`** (with Webpack CLI entry **`scaffold/webview.webpack.js`**). Dependencies stay only in the extension root `package.json`.

- `webpack.factory.js` — minimal rules; add Less/Sass/Vite yourself.
- `src/index.html` — same VSCode webview placeholders as the antd-less template.

Wire `scaffold/webview.webpack.js` the same way as **`easy-vscode/examples/vscode-webview-demo`** (see that example’s `scaffold/` layout).

## No `package.json` here — install in your extension root

This folder is **not** an npm package. Only **HTML + webpack factory** live here. Your **extension** must declare runtime and build tooling.

### `dependencies` (example)

- `react`, `react-dom` (match your extension; 17.x is typical)
- `@easy_vscode/webview` (runtime: `registerWebview`, `callVscode`)

### `devDependencies` (example — align with `webpack.factory.js`)

- `webpack`, `webpack-cli`, `webpack-dev-server` (if you use `ui-dev`)
- `babel-loader`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`, `@babel/plugin-transform-runtime`, `@babel/plugin-syntax-dynamic-import`
- `css-loader`, `style-loader`, `mini-css-extract-plugin`
- `html-webpack-plugin`, `clean-webpack-plugin`, `fork-ts-checker-webpack-plugin`, `terser-webpack-plugin`
- `typescript` (for `tsc` / typecheck)

Reference: `easy-vscode/examples/vscode-webview-demo/package.json`.
