# 用户视角：Webview 里怎么用 React、去哪装依赖？

## 核心一句

**整个扩展只有一个 `package.json`（在扩展根目录，和 `src/extension.ts` 同级）。**  
所有依赖——`react`、`antd`、`webpack`、`babel`——都写在这里。  
`scaffold/bundler/` **不是** npm 包，里面**不需要**也不应该有 `package.json`。

---

## 三个目录分别干什么？

| 位置 | 角色 |
|------|------|
| **扩展根目录 `package.json`** | 声明 `dependencies` / `devDependencies`（React、UI 库、打包工具等） |
| **`src/webview/`** | 你的业务 UI：`index.tsx` 里 `registerWebview`，各 Panel 组件 |
| **`scaffold/bundler/`** | 从模板拷来的 **webpack 工厂 + `index.html` + favicon**（由 `vendor:template` 维护） |
| **`scaffold/webview.webpack.js`** | Webpack CLI 入口，一般也用脚本生成；你可小幅改入口路径 |

`@easy_vscode/webview` 只提供运行时 API（`registerWebview`、`callVscode`），同样装在**根目录** `package.json` 里。

---

## 定制 React 的方式（用户怎么做）

1. **版本**：在根 `package.json` 里改 `react` / `react-dom` 版本，再 `yarn`。  
2. **语法 / JSX**：根目录 `.babelrc`（或 `babel.config.js`）——preset、插件都由你控制。  
3. **TypeScript**：根目录 `tsconfig.json`，入口仍是 `src/webview/index.tsx`。  
4. **换打包工具**：可以逐步改 `scaffold/bundler/webpack.factory.js` 或换整目录 `bundler/`；占位 HTML 仍在 `scaffold/bundler/src/index.html`。

业务代码**只**放在 `src/webview/`，**不要把业务逻辑塞进 `scaffold/bundler/`**（该目录以模板为准，便于整目录覆盖）。

---

## 加 Ant Design（或其它组件库）

1. **在扩展根目录安装**（不是模板目录里）：

   ```bash
   yarn add antd @ant-design/icons
   ```

2. **构建规则**：  
   - **做法 A**：用 `init-webview-template.cjs --vendor --template antd-less --force` 把 `antd-less` 整目录拷进 **`scaffold/bundler/`**（会覆盖 minimal 内容），或手动从 `easy-vscode/webview-templates/antd-less` 覆盖 **`scaffold/bundler/`**。  
   - **做法 B**：保留当前 `scaffold/bundler/webpack.factory.js`，对照 `antd-less` 自行合并 `less` / `less-loader` 等 rule。

3. **根组件**：在 `src/webview/` 里增加 `AntdWebviewShell`（参考 `easy-vscode/webview-templates/antd-less/AntdWebviewShell.sample.tsx`），在 `index.tsx` 里：

   ```ts
   registerWebview(components, { Root: AntdWebviewShell })
   ```

其它库（MUI、Chakra 等）同理：**依赖永远在根 `package.json`**；需要 CSS/主题时在 **`scaffold/bundler`** 的 webpack 工厂里加对应 loader，或在 `src/webview` 里用官方推荐引入方式。

---

## 为什么模板目录没有 `package.json`？

如果模板自带 `package.json`，很容易出现「两套依赖、两个版本」的错觉。  
当前设计是：**依赖单点，只在扩展根目录声明**；`scaffold/bundler/` 只是可替换的「构建 + HTML 壳」，不参与 `npm install`。

---

## 目录归拢

根目录建议只区分：

- **`src/`**：你主要维护的业务与 Webview UI。
- **`scaffold/`**：按文档/CLI 生成的 webpack 入口 + **`bundler/`**（vendor 模板）；见 [scaffold/README.md](./scaffold/README.md)。

---

## 与本 demo 的脚本关系

- `yarn vendor:template`：把上游 `minimal-react` 拷到 **`scaffold/bundler/`** 并写入 **`scaffold/webview.webpack.js`**。  
- 日常开发：改根 `package.json`、改 `src/webview/`；若要换模板整目录，再跑 vendor（`--force` 覆盖 **`scaffold/bundler/`**）。
