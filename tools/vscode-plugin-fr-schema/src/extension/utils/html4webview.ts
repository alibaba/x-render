import * as vscode from 'vscode';

/**
 * Get the static html used for the editor webviews.
 */
const getHtmlForWebview = (
  webview: vscode.Webview,
  extensionPath: string,
  pluginConfig?: {
    preview?: boolean;
    theme?: boolean;
  }
): string => {
  const baseUri = `${webview.asWebviewUri(
    vscode.Uri.file(extensionPath)
  )}/out/webview`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${baseUri}/umi.css">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <title>FormRender generator</title>
        <script>
          window.pluginConfig = ${JSON.stringify(pluginConfig)};
          window.routerBase = location.pathname.split('/').slice(0, -1).concat('').join('/');
          window.publicPath = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + window.routerBase;
        </script>
      </head>
      <body>
        <div id="root"></div>
        <script src="${baseUri}/umi.js"></script>
      </body>
    </html>`;
};

export default getHtmlForWebview;
