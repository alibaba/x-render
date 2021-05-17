const config = {
  publicPath: './',
  outputPath: 'out/webview',
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  devServer: {
    writeToDisk: true,
  },
  devtool: false,
};

export default config;
