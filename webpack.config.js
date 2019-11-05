const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'development',
  context: resolve(__dirname, 'demo'),
  entry: './index.js',
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'demo/1/'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['json'],
      features: ['snippets','suggest']
    }),
    new HtmlWebpackPlugin({
      resources: {
        js: [
          'react@16.x/umd/react.production.min',
          'react-dom@16.x/umd/react-dom.production.min',
          'prop-types@15.x/prop-types',
          'moment@2.24.0/moment',
          '@alifd/next@1.x/dist/next',
        ],
        css: ['@alifd/next@1.x/dist/next'],
      },
      template: resolve(__dirname, 'demo/index.html'),
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      extractComments: false,
      uglifyOptions: {
        compress: {
          unused: true,
          drop_debugger: true
        },
        warnings: false,
        output: {
          comments: false
        }
      }
    })
  ],
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var (window.PropTypes || window.React.PropTypes)',
    '@alifd/next': 'var window.Next',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: resolve(__dirname, 'docs/demo'),
    publicPath: '/',
    port: 9000,
    host: '127.0.0.1',
    watchContentBase: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api'
    }
  },
};
