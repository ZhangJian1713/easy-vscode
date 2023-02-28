const path = require('path')

const webpackConfig = require('@easy-vscode/webview/webpack.webview').default

const entryApp = path.resolve(__dirname, '../src/webview/index.tsx')
webpackConfig.entry.app = [entryApp]

exports.default = webpackConfig