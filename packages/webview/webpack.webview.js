const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const cssUse = [MiniCssExtractPlugin.loader].concat('css-loader')
const cssUseDebug = ['style-loader', 'css-loader']

console.log('process.cwd():', process.cwd())
console.log('__dirname:', __dirname)

// const isProductionMode = argv.mode === 'production'
const isProductionMode = true
exports.default = {
  target: 'web',
  entry: {
    // app: ['./src/webviewUI/src/index.tsx']
    app: [path.resolve(__dirname, './src/index.tsx')]
  },
  output: {
    path: path.resolve('./distWebview/'),
    publicPath: '/'
  },
  optimization: {
    chunkIds: 'named',
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
            configFile: path.resolve(__dirname, './.babelrc')
          }
        }
      },
      {
        test: /\.css$/,
        use: isProductionMode ? cssUse : cssUseDebug
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#2673DD',
                  'link-color': '#2673DD'
                },
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff2|svg?)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin(),
    // !isProductionMode &&
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/**/*.{ts,tsx}']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/favicon.ico'),
      inject: true,
      minify: {
        html5: true,
        minifyCSS: false,
        minifyJS: false,
        removeComments: false,
        collapseWhitespace: false,
        preserveLineBreaks: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProductionMode ? '[id].[hash].css' : '[id].css'
    })
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true,
    compress: true,
    port: 5000
  },
  devtool: isProductionMode ? false : 'source-map'
}
