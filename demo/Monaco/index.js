import React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { suggestions } from './snippets';
import theme from 'monaco-themes/themes/Night Owl.json';

export default class MonacoEditor extends React.Component {
  componentDidMount() {
    const { value, onValueChange = () => {}, ...options } = this.props;
    monaco.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: () => {
        return { suggestions };
      },
    });

    monaco.editor.defineTheme('form-render', theme);
    this._editor = monaco.editor.create(this._node, {
      value,
      language: 'json',
      fontSize: '18px',
      theme: 'form-render',
      minimap: {
        enabled: false,
      },
      ...options,
    });
    const model = this._editor.getModel();
    model.updateOptions({ tabSize: 2 });
    this._subscription = model.onDidChangeContent(() => {
      onValueChange(model.getValue());
    });
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    // this._editor.updateOptions(options);
    const model = this._editor.getModel();
    if (value !== model.getValue()) {
      // model.setValue(value);
      // better than setValue
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: value,
          },
        ]
      );
    }
  }

  componentWillUnmount() {
    this._editor && this._editor.dispose();
    this._subscription && this._subscription.dispose();
  }

  render() {
    return <div style={{ height: 600, marginTop: -15 }} ref={c => (this._node = c)} />;
  }
}
