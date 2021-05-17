/**
 * schema to interface
 */

import * as vscode from 'vscode';
import {
  getInterfaceFromModel,
  getModelFromSchema,
  getSchemaFromCode,
} from './utils';

export class frCode2InterfaceProvider {
  public static register(): vscode.Disposable {
    return vscode.commands.registerCommand(
      frCode2InterfaceProvider.viewType,
      () => {
        const { document, selection } = vscode.window.activeTextEditor || {};
        if (document && selection)
          frCode2InterfaceProvider.generate(document, selection);
      }
    );
  }

  private static readonly viewType = 'frSchema.c2i';

  public static async generate(
    document: vscode.TextDocument,
    selection: vscode.Selection
  ) {
    try {
      const code = document.getText(selection) || '';
      const formSchema = getSchemaFromCode(code);
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
