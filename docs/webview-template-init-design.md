# Webview 模板初始化：设计与约定

## 问题背景

- **Runtime**：`@easy_vscode/webview`（npm 或 `file:`）只提供 `registerWebview` / `callVscode`。
- **前端工程**：`webpack`、`index.html`、`favicon`、可选 Ant Design 壳等放在 **`easy-vscode/webview-templates/*`**，由扩展仓库引用或**拷贝**后自行维护。

用户需要：**可重复的接线方式**、**幂等**（已有文件不覆盖）、以及未来可做成 **npm 命令** 的路径。

---

## `vscode-webview-demo` 用哪个模板？

- **当前应使用 `minimal-react`**（无 Ant Design，与 demo 一致）。
- **不要用 `antd-less`**，除非你在 demo 里引入 antd 并复制 `AntdWebviewShell` + 全局样式。

二者关系：

| 模板 | 适用 |
|------|------|
| `minimal-react` | React + 普通 CSS，轻量 demo |
| `antd-less` | Ant Design + Less（与 `vscode-image-viewer` 同类） |

---

## 目录约定（建议作为检查条件）

在扩展项目根目录（含 `package.json`）下约定：

| 路径 | 含义 |
|------|------|
| `src/webview/index.tsx` | Webpack **入口**；内部调用 `registerWebview(...)` |
| `src/webview/**/*.tsx` | 业务 Webview 组件 |
| **`scaffold/webview.webpack.js`** | Webpack CLI 入口 |
| **`scaffold/bundler/`** | Vendor 出的模板（factory + HTML/favicon），与业务分离 |

**旧仓库**仍可保留 `easyVscodeConfig/webview.webpack.js`，与 **`scaffold/`** 二选一即可。新约定与 `init-webview-template` 默认写入 **`scaffold/`**。

初始化脚本**默认**只保证生成/更新 **`scaffold/webview.webpack.js`**；**不强制**创建 `src/webview`（避免覆盖业务代码）。可选 `--check-entry` 仅打印缺失提示。

---

## 「源码」如何利用起来？

两种方式（可同时写进文档，由脚本支持）：

### A. Monorepo 引用（你现在的方式）

- 不拷贝模板目录，直接从仓库路径 `require('.../easy-vscode/webview-templates/.../webpack.factory.js')`。
- **优点**：改一处模板，所有子项目立刻跟上。
- **缺点**：发布后扩展仓库里**没有** `easy-vscode` 时，必须改用模式 B。

### B. 内联拷贝（`--vendor`）

- 将所选模板 **复制**到扩展根下的 **`scaffold/bundler/`**（可被 minimal / antd-less 整目录替换；可提交到 git）。
- **`scaffold/webview.webpack.js`** 内 `require` 指向 **`./bundler/webpack.factory.js`**。
- **优点**：扩展可独立 clone、发版，不依赖 monorepo 路径。
- **缺点**：模板升级需重新跑脚本或手动合并。

---

## 幂等行为

| 目标 | 默认 | `--force` |
|------|------|-----------|
| `easyVscodeConfig/webview.webpack.js` | 已存在则 **跳过写入** | 覆盖 |
| `scaffold/bundler/`（`--vendor`） | 目录已存在且非空则 **跳过拷贝** | **`--force` 先删再拷** |

脚本退出码：`0` 表示成功（含 skipped）；非 0 表示参数错误或找不到模板根目录。

---

## npm 包 / 命令形态（演进）

**现阶段**：在 `easy-vscode` 仓库内提供：

```bash
node easy-vscode/scripts/init-webview-template.cjs --cwd /path/to/extension --template minimal-react
```

**下一阶段**（可选）：发布 `@easy_vscode/create-webview` 或 `create-easy-vscode-webview`，内部打包模板 tarball，执行：

```bash
npx @easy_vscode/create-webview --template minimal-react
```

实现上等价于：解析模板包内路径 + 写 **`scaffold/webview.webpack.js`** + 可选 `--vendor` 解压到 **`scaffold/bundler/`**。

---

## 与 `@easy_vscode/webview` 的关系

- **依赖**：扩展的 `package.json` 始终声明 `@easy_vscode/webview`（生产用 semver，开发用 `file:`）。
- **模板**：与 npm 包 **分离**；脚本只处理 **webpack/HTML 路径**，不安装 runtime。

这样既满足「只依赖一个小 runtime 包」，又满足「webpack 完全自控」。
