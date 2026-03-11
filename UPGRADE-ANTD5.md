# Ant Design 5 升级说明

## 发布顺序（必须遵守）

1. **先发布 easy-vscode**：`yarn pub` 或 `lerna publish` 发布 @easy_vscode/webview@1.7.0
2. **再升级 vscode-image-viewer**：将 @easy_vscode/webview 依赖更新为 ^1.7.0 后发布

vscode-image-viewer 依赖 @easy_vscode/webview，必须先发布 easy-vscode 新版本。

### 本地联调（发布前测试）
```bash
# 在 easy-vscode 中
cd packages/webview && yarn link

# 在 vscode-image-viewer 中
yarn link @easy_vscode/webview
```

## 本次变更

### packages/webview
- antd ^4.22.5 → ^5.22.0
- @ant-design/icons ^4.7.16 → ^5.5.0
- App.tsx: 移除 `antd/dist/antd.css`（antd 5 使用 CSS-in-JS）
- .babelrc: 移除 babel-plugin-import for antd
- version: 1.6.9 → 1.7.0

### packages/demo
- antd ^4.16.8 → ^5.22.0
- @ant-design/icons ^4.7.13 → ^5.5.0
- @easy_vscode/webview ^1.6.9 → ^1.7.0
- Dropdown: overlay → menu API
- .babelrc: 移除 babel-plugin-import for antd
- resolutions: 添加 rc-util 5.44.4

### 根目录
- resolutions: rc-util 5.44.4
