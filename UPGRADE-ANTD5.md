# Ant Design 5 upgrade notes

## Release order (required)

1. **Publish `easy-vscode` first**: run `yarn pub` or `lerna publish` and ship `@easy_vscode/webview@1.7.0`.
2. **Then upgrade `vscode-image-viewer`**: bump `@easy_vscode/webview` to `^1.7.0` and publish.

`vscode-image-viewer` depends on `@easy_vscode/webview`, so the library must be published before the extension.

### Local integration (pre-release)

```bash
# In easy-vscode
cd packages/webview && yarn link

# In vscode-image-viewer
yarn link @easy_vscode/webview
```

## Changes in this upgrade

### `packages/webview`

- `antd` ^4.22.5 → ^5.22.0
- `@ant-design/icons` ^4.7.16 → ^5.5.0
- `App.tsx`: remove `antd/dist/antd.css` (Ant Design 5 uses CSS-in-JS)
- `.babelrc`: remove `babel-plugin-import` for `antd`
- version: 1.6.9 → 1.7.0

### `packages/demo`

- `antd` ^4.16.8 → ^5.22.0
- `@ant-design/icons` ^4.7.13 → ^5.5.0
- `@easy_vscode/webview` ^1.6.9 → ^1.7.0
- `Dropdown`: `overlay` → `menu` API
- `.babelrc`: remove `babel-plugin-import` for `antd`
- `resolutions`: add `rc-util` 5.44.4

### Repository root

- `resolutions`: `rc-util` 5.44.4
