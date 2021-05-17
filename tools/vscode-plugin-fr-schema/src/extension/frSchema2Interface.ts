/**
 * schema to interface
 */

import * as vscode from 'vscode';
import { getInterfaceFromModel, getModelFromSchema } from './utils';

export class frSchema2InterfaceProvider {
  public static register(): vscode.Disposable {
    return vscode.commands.registerCommand(
      frSchema2InterfaceProvider.viewType,
      (uri: vscode.Uri) => {
        let resource = uri;
        if (!(resource instanceof vscode.Uri)) {
          if (vscode.window.activeTextEditor) {
            resource = vscode.window.activeTextEditor.document.uri;
          }
        }

        frSchema2InterfaceProvider.generate(resource);
      }
    );
  }

  private static readonly viewType = 'frSchema.s2i';

  public static async generate(uri: vscode.Uri) {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      const formSchema = JSON.parse(document.getText());
      const schema = formSchema.schema || formSchema.propsSchema || formSchema;
      const formModel = getModelFromSchema(schema);
      const formInterface = getInterfaceFromModel.convert(formModel, schema);
      vscode.env.clipboard.writeText(formInterface);
      vscode.window.setStatusBarMessage('类型定义已复制至剪贴板！', 3000);
    } catch (err) {
      vscode.window.showWarningMessage(err.message);
    }
  }
}
