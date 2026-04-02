# react-less (merged / migration pointer)

This folder **has no** standalone `package.json` or full template code—only migration notes. The **two copyable templates** are **`minimal-react`** and **`antd-less`**.

Use these instead:

| Need | Directory |
|------|-----------|
| Ant Design + Less + React | [`../antd-less/`](../antd-less/) |
| React + plain CSS only (no Ant Design) | [`../minimal-react/`](../minimal-react/) |

Webpack setup lives in each folder’s `webpack.factory.js`; it is **not** shipped inside `@easy_vscode/webview` (`@easy_vscode/webview@2.x`).
