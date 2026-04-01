# Examples

可独立开发与调试的 **VS Code 扩展示例**（不随 npm 发布；`packages/*` 仍为库包）。

| 目录 | 说明 |
|------|------|
| [vscode-webview-demo](./vscode-webview-demo/) | 最小 Webview + `@easy_vscode/core` / `@easy_vscode/webview` 消息演示；使用 `scaffold/` 与上游 `webview-templates`。 |

在示例目录内执行 `yarn`、`yarn prepare:easy-vscode`（若依赖 `file:` 指向本地 `packages/*`）、再 `yarn package` / F5 即可。
