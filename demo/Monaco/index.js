import React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
import { suggestions } from './snippets';
import theme from 'monaco-themes/themes/Solarized-light.json';
export default class MonacoEditor extends React.Component {
  componentDidMount() {
    const { value, onValueChange = () => {}, ...options } = this.props;
    // const model = monaco.editor.createModel(value, language, path);
    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, label) {
        if (label === 'json') {
          return './json.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
          return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
      },
    };

    monaco.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: (model, position, context, token) => {
        return { suggestions };
      },
    });

    monaco.editor.defineTheme('solarized-light', theme);
    // monaco.editor.setTheme('solarized-light');
    this._editor = monaco.editor.create(this._node, {
      value,
      language: 'json',
      fontSize: '14px',
      theme: 'solarized-light',
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
    console.log('dunmont');
    this._editor && this._editor.dispose();
    this._subscription && this._subscription.dispose();
  }

  render() {
    return <div style={{ height: 600 }} ref={c => (this._node = c)} />;
  }
}
