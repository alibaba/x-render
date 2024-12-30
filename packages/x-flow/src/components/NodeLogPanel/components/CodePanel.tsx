import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { Typography } from 'antd';
import { isString } from 'lodash';
import React, { memo, useRef, useState } from 'react';

const DEFAULT_THEME = {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#F2F4F7',
  },
};

export default memo((props: any) => {
  const { codeData } = props;
  const [isCopy, setIsCopy] = useState(false);
  const editorRef = useRef<any>(null);
  const isRenderTitle = isString(codeData?.title);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monaco.editor.defineTheme('default-theme', DEFAULT_THEME);

    monaco.editor.defineTheme('blur-theme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#F2F4F7',
      },
    });

    monaco.editor.defineTheme('focus-theme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
      },
    });

    monaco.editor.setTheme('default-theme');
  };

  const copyCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setIsCopy(true);
          setTimeout(() => {
            setIsCopy(false);
          }, 1000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <div className="log-code-panel">
      <div className="log-code-title">
        {isRenderTitle ? (
          <Typography.Text
            className="log-code-title-text"
            ellipsis={{
              tooltip: {
                title: codeData?.title,
                color: '#ffff',
                overlayInnerStyle: {
                  color: '#354052',
                  fontSize: '12px',
                },
                getPopupContainer: () =>
                  document.getElementById('xflow-container') as HTMLElement,
              },
            }}
          >
            {codeData?.title}
          </Typography.Text>
        ) : (
          <>{codeData?.title}</>
        )}
        {isCopy ? (
          <CheckOutlined className="log-code-copy" />
        ) : (
          <CopyOutlined className="log-code-copy" onClick={copyCode} />
        )}
      </div>
      <Editor
        className="log-code-editor"
        language={'json'}
        theme={'default-theme'}
        value={codeData?.code}
        options={{
          readOnly: true,
          domReadOnly: true,
          quickSuggestions: false,
          minimap: { enabled: false },
          // wordWrap: 'on',
          unicodeHighlight: {
            ambiguousCharacters: false,
          },
        }}
        onMount={handleEditorDidMount}
        // loading={''}
      />
    </div>
  );
});
