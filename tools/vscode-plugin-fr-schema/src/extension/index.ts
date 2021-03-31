import * as vscode from 'vscode';
import { frSchemaGenProvider } from './frSchemaGen';
import { frSchemaEditProvider } from './frSchemaEdit';
import * as frSchemaPreviewProvider from './frSchemaPreview';
import { frSchemaEditorProvider } from './frSchemaEditor';
import { frProp2SchemaProvider } from './frProp2Schema';
import { frSchema2InterfaceProvider } from './frSchema2Interface';
import { frCode2InterfaceProvider } from './frCode2Interface';

export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(frSchemaGenProvider.register());
  context.subscriptions.push(frSchemaEditProvider.register());
  context.subscriptions.push(frSchemaPreviewProvider.register(context));
  context.subscriptions.push(frSchemaEditorProvider.register(context));
  context.subscriptions.push(frProp2SchemaProvider.register());
  context.subscriptions.push(frSchema2InterfaceProvider.register());
  context.subscriptions.push(frCode2InterfaceProvider.register());
}
