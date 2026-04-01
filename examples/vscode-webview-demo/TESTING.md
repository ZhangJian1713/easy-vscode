# 可行性验证流程（vscode-webview-demo）

## 前置条件

- 用 **VS Code / Cursor 单独打开文件夹** `easy-vscode/examples/vscode-webview-demo`（不要只用多根工作区里错误的子根按 F5）。
- 本机已安装 Node / Yarn。本示例位于 **easy-vscode 仓库内**，`yarn vendor:template` 会解析同仓库的 `webview-templates/`；若在异形的 monorepo 里，可设 `EASY_VSCODE_ROOT`。
- 若使用 `file:../../packages/core`，需先编出 `core` 的 `lib`：  
  `yarn prepare:easy-vscode`

## 一键检查清单

1. **安装依赖**  
   `yarn`

2. **（首次或更新模板后）拷贝模板到 `scaffold/bundler/`**  
   `yarn vendor:template`  
   覆盖：`yarn vendor:template -- --force`

3. **编译 Webview + 扩展宿主**  
   `yarn package`（使用 `scaffold/webview.webpack.js`）  
   成功后应存在：
   - `distWebview/index.html`（及 `app*.js` 等）
   - `dist/extension.js`

4. **类型检查（可选）**  
   `yarn check-type`

## 在编辑器里测 UI

1. 选启动配置 **「Run Webview Demo Extension」**（会先执行 `demo:package` 任务，等价 `yarn package`）。
2. **F5** 打开 Extension Development Host。
3. 命令面板：`Open Webview Demo`。
4. 在面板里点 **Send PING** / **Get Extension Info**，日志区应出现扩展端回传的 JSON。

## 常见问题

| 现象 | 处理 |
|------|------|
| `command 'webview-demo.open' not found` | 确认工作区根是 `examples/vscode-webview-demo`；先 `yarn package`，再 F5。 |
| `@easy_vscode/core` 找不到 `lib` | 执行 `yarn prepare:easy-vscode`。 |
| 找不到 `scaffold/bundler/webpack.factory.js` | 执行 `yarn vendor:template`。 |

## 本环境实测结果

在仓库当前状态下执行 `yarn package` 已通过，`distWebview` 与 `dist/extension.js` 已生成（你本地应以自己机器结果为准）。
