const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const prefixer = require('postcss-prefix-selector');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'development',
  context: resolve(__dirname, 'demo'),
  entry: {
    main: './index.js',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'docs/demo'),
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
  devtool: 'inline-source-map',
  plugins: [
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
  },
};
