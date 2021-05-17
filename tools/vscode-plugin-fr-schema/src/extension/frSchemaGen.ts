/**
 * data to schema
 */

import * as vscode from 'vscode';

export class frSchemaGenProvider {
  public static register(): vscode.Disposable {
    return vscode.commands.registerCommand(
      frSchemaGenProvider.viewType,
      (uri: vscode.Uri) => {
        let resource = uri;
        if (!(resource instanceof vscode.Uri)) {
          if (vscode.window.activeTextEditor) {
            resource = vscode.window.activeTextEditor.document.uri;
          }
        }

        frSchemaGenProvider.generate(resource);
      }
    );
  }

  private static readonly viewType = 'frSchema.gen';

  public static async generate(uri: vscode.Uri) {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      const editor = await vscode.window.showTextDocument(document);
      const val = JSON.parse(document.getText());
      const schema = frSchemaGenProvider.recurseTree({ val });

      editor.edit(editBuilder => {
        editBuilder.replace(
          new vscode.Range(0, 0, document.lineCount, 0),
          JSON.stringify(schema, null, 2)
        );
      });
    } catch (err) {
      vscode.window.showWarningMessage(err.message);
    }
  }

  public static recurseTree({ key, val = null }: { key?: string; val: any }) {
    interface Item {
      type?: string;
      title?: string | undefined;
      items?: any;
      properties?: any;
    }
    const item: Item = {};
    const type = Object.prototype.toString
      .call(val)
      .slice(8, -1)
      .toLowerCase();
    switch (type) {
      case 'null':
      case 'undefined':
        return { type };
      case 'number':
      case 'string':
      case 'boolean':
        item.type = type;
        item.title = key;
        break;
      case 'array':
        item.type = type;
        item.items = frSchemaGenProvider.recurseTree({ key, val: val[0] });
        item.title = key;
        break;
      case 'object': {
        item.type = type;
        Object.keys(val).forEach(subkey => {
          const subval = val[subkey];
          const result = frSchemaGenProvider.recurseTree({
            key: subkey,
            val: subval,
          });
          item.properties = { ...item.properties, [subkey]: result };
        });
        if (key) item.title = key;
        break;
      }
      default: {
        vscode.window.showWarningMessage(
          `The existed type ${type} is no allowed.`
        );
      }
    }
    return item;
  }
}
