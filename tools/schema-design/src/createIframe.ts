const createIframeContent = () => {
  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>阿里低代码引擎 Demo</title>
        <link rel="icon" href="//img.alicdn.com/imgextra/i2/O1CN01lNWGJi1xflgRfSgbk_!!6000000006471-55-tps-22-26.svg">
        <link href="https://dev.g.alicdn.com/fone-lowcode/fr-generator/1.0.0/css/index.css" rel="stylesheet" />
        <!-- 低代码引擎的页面主题样式，可以替换为 theme-lowcode-dark -->
        <link href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/variables.css" rel="stylesheet" />
        <link href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/dist/next.var.min.css" rel="stylesheet" />
        <!-- 低代码引擎的页面框架样式 -->
        <link rel="stylesheet" href="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.1.3-beta.4/dist/css/engine-core.css" />
        <!-- 低代码引擎官方扩展的样式 -->
        <link rel="stylesheet" href="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.5/dist/css/engine-ext.css" />
        <link rel="stylesheet" href="https://dev.g.alicdn.com/fone-lowcode/fr-generator/1.0.0/css/index.css" />

        <script>
          window.React = window.parent.React;
          window.ReactDOM = window.parent.ReactDOM
        </script>

        <!-- React 向下兼容，预防物料层的依赖 -->
        <script src="https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js"></script>
        <script src="https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js"></script>
        <!-- lodash，低代码编辑器的依赖 -->
        <script src="https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"></script>
        <!-- 日期处理包，Fusion Next 的依赖 -->
        <script src="https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"></script>
        <!-- Fusion Next 的主包，低代码编辑器的依赖 -->
        <script src="https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js"></script>
        <!-- 低代码引擎的主包 -->
        <script crossorigin="anonymous" src="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.1.3-beta.4/dist/js/engine-core.js"></script>
        <!-- 低代码引擎官方扩展的主包 -->
        <script crossorigin="anonymous" src="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.5/dist/js/engine-ext.js"></script>
      </head>

      <body>
        <div id="lce-container"></div>
        <script type="text/javascript" src="https://dev.g.alicdn.com/fone-lowcode/fr-generator/1.0.0/js/index.js"></script>
      </body>
    </html>
  `;
  return html;
};

export default () => {
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.frameBorder = '0';
  iframe.srcdoc = createIframeContent();
  
  return iframe;
};