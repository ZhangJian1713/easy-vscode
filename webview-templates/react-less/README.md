# react-less（已合并迁移）

此目录**没有**独立 `package.json` 与完整代码，仅为迁移说明。**实际可复制的模板只有两个**：`minimal-react`、`antd-less`。

这里的旧模板已移除，请改用：

| 需求 | 目录 |
|------|------|
| Ant Design + Less + React | [`../antd-less/`](../antd-less/) |
| 仅 React + 普通 CSS（无 Ant Design） | [`../minimal-react/`](../minimal-react/) |

Webpack 配置在对应目录的 `webpack.factory.js` 中，不再从 `@easy_vscode/webview` 包内提供（`@easy_vscode/webview@2.x`）。
