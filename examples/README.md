# Examples

Runnable **VS Code extension examples** for local development and debugging. These are **not** published to npm; **`packages/*`** remains the library surface.

| Directory            | Description |
|----------------------|-------------|
| [vscode-webview-demo](./vscode-webview-demo/) | Minimal webview + `@easy_vscode/core` / `@easy_vscode/webview` messaging demo; uses `scaffold/` and upstream `webview-templates`. |

In an example folder: run `yarn`, then `yarn prepare:easy-vscode` when using `file:` to local `packages/*`, then `yarn package` or F5.
