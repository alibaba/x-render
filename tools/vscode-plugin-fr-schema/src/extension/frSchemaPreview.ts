/**
 * schema preview
 */

import * as vscode from 'vscode';
import { getHtmlForWebview } from './utils';

const viewType = 'frSchema.preview';

const initWebview = (
  editor: vscode.TextEditor,
  context: vscode.ExtensionContext
) => {
  const { document } = editor;
  const webviewPanel = vscode.window.createWebviewPanel(
    viewType,
    `Preview ${document.fileName.replace(/.*(\/|\\)/, '')}`,
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      enableFindWidget: false,
    }
  );

  const root = vscode.Uri.joinPath(context.extensionUri, 'media');
  const theme: any = vscode.workspace
    .getConfiguration()
    .get('vscode-plugin-fr-schema.theme');
  webviewPanel.iconPath = {
    light: vscode.Uri.joinPath(root, 'preview-light.svg'),
    dark: vscode.Uri.joinPath(root, 'preview-dark.svg'),
  };
  webviewPanel.webview.html = getHtmlForWebview(
    webviewPanel.webview,
    context.extensionPath,
    { theme, preview: true }
  );

  const updateWebview = () => {
    webviewPanel.webview.postMessage({
      type: 'update',
      body: document.getText(),
    });
  };

  // Hook up event handlers so that we can synchronize the webview with the text document.
  const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
    e => {
      if (e.document.uri.toString() !== document.uri.toString()) {
        return;
      }
      updateWebview();
    }
  );

  // Make sure we get rid of the listener when our editor is closed.
  webviewPanel.onDidDispose(() => {
    changeDocumentSubscription.dispose();
  });

  // Receive message from the webview.
  webviewPanel.webview.onDidReceiveMessage(async ({ type }) => {
    switch (type) {
      case 'init':
        updateWebview();
        break;
      default:
        break;
    }
  });
};

export const register = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand(viewType, () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) initWebview(editor, context);
  });
};
