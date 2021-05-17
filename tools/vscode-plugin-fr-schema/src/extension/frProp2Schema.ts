/**
 * proptypes to schema
 */

import * as vscode from 'vscode';
import * as docgen from 'react-docgen';
import * as toSchema from 'proptypes-to-json-schema/src/to-Schema';

export class frProp2SchemaProvider {
  public static register(): vscode.Disposable {
    return vscode.commands.registerCommand(
      frProp2SchemaProvider.viewType,
      (uri: vscode.Uri) => {
        let resource = uri;
        if (!(resource instanceof vscode.Uri)) {
          if (vscode.window.activeTextEditor) {
            resource = vscode.window.activeTextEditor.document.uri;
          }
        }

        frProp2SchemaProvider.generate(resource);
      }
    );
  }

  private static readonly viewType = 'frSchema.p2s';

  public static async generate(uri: vscode.Uri) {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      const info = docgen.parse(
        document.getText(),
        docgen.resolver.findExportedComponentDefinition,
        docgen.defaultHandlers
      );
      const schema = toSchema(info, { shouldAddUi: false });
      const schemaUri = vscode.Uri.joinPath(uri, '../schema.json');

      await vscode.workspace.fs.writeFile(
        schemaUri,
        Buffer.from(JSON.stringify(schema, null, 2))
      );
      vscode.window.showTextDocument(schemaUri);
    } catch (err) {
      vscode.window.showWarningMessage(err.message);
    }
  }
}
