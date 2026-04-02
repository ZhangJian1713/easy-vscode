# Webview Runtime Boundary

## Goal

Define the minimum stable surface of `@easy_vscode/webview` so it stays lightweight and reusable.

## In Scope (Stable API)

- `registerWebview(components, options?)`
  - Mount React components into webview root container.
  - Choose component by `window.currentView`.
  - Optional `options.Root` for layout shells (e.g. Ant Design `ConfigProvider`).
- `callVscode(message, callback?)`
  - Send message to extension host via `postMessage`.
  - Support callback mapping by `callbackId`.
- Shared message types used by these APIs.

## Out of Scope (Do Not Add)

- UI framework coupling (`antd`, component themes, design systems).
- Styling coupling (`styled-components`, `less` runtime assumptions).
- Business-level abstractions (image viewer logic, domain commands).
- Heavy template assets and project scaffolding logic.

## Design Principles

- Keep runtime small and predictable.
- Keep API stable and semver-friendly.
- Let template layer decide UI stack and styles.
- Let consumer projects own business state and component architecture.

## Implementation status

- Webpack/HTML/CSS live under `webview-templates/` (not in `@easy_vscode/webview`).
- Runtime no longer initializes i18n; import i18n in the consumer entry if needed.
- Package dependencies trimmed to peers only.

