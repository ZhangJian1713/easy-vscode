# easy-vscode webview-templates

Copy these folders into your VS Code extension (or reference them from a monorepo) and **own** the webpack/HTML/CSS stack.

| Template        | When to use |
|-----------------|-------------|
| **antd-less**   | Ant Design + Less + React (same class of setup as `vscode-image-viewer`). |
| **minimal-react** | React + plain CSS only (e.g. `examples/vscode-webview-demo`). |

The `@easy_vscode/webview` npm package should only provide **runtime** (`registerWebview`, `callVscode`), not webpack.

## Why there is no `package.json` inside each template

Templates are **not** installable packages. **`src/index.html` alone cannot run anything** — it is only the HTML shell for `HtmlWebpackPlugin`. React, webpack, loaders, and (for antd-less) `antd` / `less` are installed in **your extension root** `package.json` (same place as `@easy_vscode/webview`). Each template README lists **recommended dependencies** to add there.

The **`react-less` folder** is only a migration pointer (see its README); the real templates are **`minimal-react`** and **`antd-less`**.

## Wiring

Each template exports a webpack **factory** that returns the standard `(env, argv) => config` shape.

**Recommended layout**: `scaffold/webview.webpack.js` + `scaffold/bundler/` (vendored template). Example when referencing the monorepo **without** vendor (paths vary with repo layout):

```js
const path = require('path')
const { createAntdLessWebviewWebpackConfig } = require('../../easy-vscode/webview-templates/antd-less/webpack.factory.js')

const context = path.resolve(__dirname, '..')
const templateRoot = path.resolve(__dirname, '../../easy-vscode/webview-templates/antd-less')

module.exports = createAntdLessWebviewWebpackConfig({
  context,
  entry: path.resolve(context, 'src/webview/index.tsx'),
  htmlTemplate: path.resolve(templateRoot, 'src/index.html'),
  favicon: path.resolve(templateRoot, 'src/favicon.ico'),
  babelConfig: path.resolve(context, '.babelrc')
})
```

After **`--vendor`**, point `require` and `templateRoot` at `./bundler/...` (see `easy-vscode/examples/vscode-webview-demo/scaffold/`).

After publishing to npm, copy this template into your repo so paths stay under your control.

## One-shot wiring (monorepo)

From your **extension root** (e.g. `easy-vscode/examples/vscode-webview-demo/`):

```bash
node ../../scripts/init-webview-template.cjs --cwd . --template minimal-react --vendor
```

- Skips overwriting `scaffold/webview.webpack.js` if it already exists (use `--force` to replace).
- Use `--template antd-less` for Ant Design + Less projects.
- Use `--vendor` to copy the template into **`scaffold/bundler/`** and wire paths for standalone clones.

See [webview-template-init-design.md](../docs/webview-template-init-design.md).
