const createIframeContent = () => {
  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>XRender</title>
        <link rel="icon" href="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png">
        <link href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/variables.css" rel="stylesheet" />
        <link href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/dist/next.var.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.2.3/dist/css/engine-core.css" />
        <link rel="stylesheet" href="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.6/dist/css/engine-ext.css" />
        <link rel="stylesheet" href="https://g.alicdn.com/fone-lowcode/fr-generator/1.0.14/css/index.css" />

        <script>
          window.React = window.parent.React;
          window.ReactDOM = window.parent.ReactDOM;
        </script>
        
        <script src="https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js"></script>
        <script src="https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js"></script>
        <script src="https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"></script>
        <script src="https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"></script>
        <script src="https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js"></script>
        <script crossorigin="anonymous" src="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.2.3/dist/js/engine-core.js"></script>
        <script crossorigin="anonymous" src="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.6/dist/js/engine-ext.js"></script>

      </head>

      <body>
        <div id="lce-container"></div>
        <script type="text/javascript" src="https://g.alicdn.com/fone-lowcode/fr-generator/1.0.14/js/index.js"></script>
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