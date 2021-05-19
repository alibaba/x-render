/**
 * toggle schema editor
 */

import * as vscode from 'vscode';

export class frSchemaEditProvider {
  public static register(): vscode.Disposable {
    return vscode.commands.registerCommand(
      frSchemaEditProvider.viewType,
      (uri: vscode.Uri) => {
        let resource = uri;
        if (!(resource instanceof vscode.Uri)) {
          if (vscode.window.activeTextEditor) {
            resource = vscode.window.activeTextEditor.document.uri;
          }
        }

        const editor = vscode.window.activeTextEditor
          ? 'frSchema.editor'
          : 'default';

        vscode.commands.executeCommand('vscode.openWith', resource, editor);
      }
    );
  }

  private static readonly viewType = 'frSchema.edit';
}
