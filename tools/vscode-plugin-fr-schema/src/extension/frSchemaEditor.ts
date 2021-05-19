/**
 * schema editor
 */

import * as vscode from 'vscode';
import { getHtmlForWebview } from './utils';

export class frSchemaEditorProvider implements vscode.CustomTextEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new frSchemaEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      frSchemaEditorProvider.viewType,
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
          enableFindWidget: false,
        },
      }
    );
    return providerRegistration;
  }

  private static readonly viewType = 'frSchema.editor';

  private innerUpdateCount = 2;

  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * Called when our custom editor is opened.
   */
  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel
  ): Promise<void> {
    // Setup initial content for the webview
    const theme: any = vscode.workspace
      .getConfiguration()
      .get('vscode-plugin-fr-schema.theme');
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = getHtmlForWebview(
      webviewPanel.webview,
      this.context.extensionPath,
      { theme }
    );

    function updateWebview() {
      webviewPanel.webview.postMessage({
        type: 'update',
        body: document.getText(),
      });
    }

    // Hook up event handlers so that we can synchronize the webview with the text document.
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      e => {
        if (e.document.uri.toString() !== document.uri.toString()) {
          return;
        }
        if (this.innerUpdateCount < 2) {
          this.innerUpdateCount += 1;
          return;
        }
        if (this.innerUpdateCount >= 2 && e.contentChanges.length) {
          updateWebview();
        }
      }
    );

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
    });

    // Receive message from the webview.
    webviewPanel.webview.onDidReceiveMessage(async ({ type, body }) => {
      switch (type) {
        case 'init':
          updateWebview();
          break;
        case 'update':
          this.innerUpdateCount = 0;
          this.updateTextDocument(document, body);
          break;
        case 'close':
          await this.updateTextDocument(document, body);
          await document.save();
          vscode.commands.executeCommand(
            'vscode.openWith',
            document.uri,
            'default'
          );
          break;
        case 'warning':
          vscode.window.showWarningMessage(body);
          break;
        case 'error':
          vscode.window.showErrorMessage(body);
          break;
        default:
          break;
      }
    });
  }

  /**
   * Write out the json string to a given document.
   */
  private updateTextDocument(document: vscode.TextDocument, jsonStr?: string) {
    if (jsonStr === undefined) return;

    const edit = new vscode.WorkspaceEdit();

    // Just replace the entire document every time.
    // TODO: compute minimal edits instead.
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      `${jsonStr}\n`
    );

    return vscode.workspace.applyEdit(edit);
  }
}
