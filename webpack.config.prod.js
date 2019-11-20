const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  mode: 'production',
  context: resolve(__dirname, 'src'),
  entry: {
    index: './index.js',
    antd: './antd.js',
    fusion: './fusion.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  ],
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var (window.PropTypes || window.React.PropTypes)',
    '@alifd/next': 'var window.Next',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
