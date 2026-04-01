const path = require('path')
const { createAntdLessWebviewWebpackConfig } = require('../../../webview-templates/antd-less/webpack.factory.js')

const context = path.resolve(__dirname, '..')
const templateRoot = path.resolve(__dirname, '../../../webview-templates/antd-less')

module.exports = createAntdLessWebviewWebpackConfig({
  context,
  entry: path.resolve(context, 'src/webview/index.tsx'),
  htmlTemplate: path.resolve(templateRoot, 'src/index.html'),
  favicon: path.resolve(templateRoot, 'src/favicon.ico'),
  babelConfig: path.resolve(context, '.babelrc')
})
