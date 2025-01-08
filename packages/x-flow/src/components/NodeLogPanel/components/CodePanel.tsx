import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { Typography } from 'antd';
import { isString } from 'lodash';
import React, { memo, useState } from 'react';

export default memo((props: any) => {
  const { codeData } = props;
  const [isCopy, setIsCopy] = useState(false);
  const isRenderTitle = isString(codeData?.title);

  const copyCode = () => {
    navigator.clipboard
      .writeText(codeData?.code)
      .then(() => {
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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
      <CodeMirror
        value={codeData?.code}
        className="log-code-editor"
        extensions={[json(), EditorView.lineWrapping]}
        height="172px"
        minHeight="172px"
        width="100%"
        theme="none"
        readOnly={true}
        editable={false}
      />
    </div>
  );
});
