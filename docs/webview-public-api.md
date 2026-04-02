# Webview Public API (Minimum)

This document defines the expected public API used by external consumers.

## `registerWebview`

```ts
type WebviewComponents = Record<string, React.FC>

interface RegisterWebviewOptions {
  Root?: React.FC<{ components: WebviewComponents }>
}

function registerWebview(components: WebviewComponents, options?: RegisterWebviewOptions): void
```

### Behavior

- Reads `window.currentView` injected by extension html.
- Falls back to first component key when not provided.
- Renders selected component into `#root` (via default root or `options.Root`).

### Consumer Example

```ts
import { registerWebview } from '@easy_vscode/webview'
import PreviewImages from './PreviewImages'
import { AntdWebviewShell } from './AntdWebviewShell'

registerWebview({ PreviewImages }, { Root: AntdWebviewShell })
```

## `callVscode`

```ts
function callVscode(msg: Partial<IMessage>, callback?: (data: any) => void): void
```

### Behavior

- Adds `msgId` and `postTime`.
- Adds `callbackId` when callback is provided.
- Resolves callback when extension posts `vscodeCallback`.

### Consumer Example

```ts
import { callVscode } from '@easy_vscode/webview'

callVscode({ cmd: 'PING' }, (resp) => {
  console.log(resp)
})
```

## Compatibility Notes

- Avoid deep import paths such as `@easy_vscode/webview/lib/...`.
- Treat APIs in this file as stable surface for consumers.
- New APIs should be additive and documented here first.

