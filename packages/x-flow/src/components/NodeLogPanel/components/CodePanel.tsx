import {
  ArrowsAltOutlined,
  CheckOutlined,
  CopyOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import classNames from 'classnames';
import { isString } from 'lodash';
import React, { memo, useState } from 'react';
import TextEllipsis from '../../TextEllipsis';

export default memo((props: any) => {
  const { codeData, onFullScreenChange, isShowFullScreen = true } = props;
  const [isCopy, setIsCopy] = useState(false);
  const isRenderTitle = isString(codeData?.title);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    <div
      className={classNames('log-code-panel', {
        ['log-code-panel-full']: isFullScreen,
      })}
    >
      <div className="log-code-title">
        {isRenderTitle ? (
          <TextEllipsis
            text={codeData?.title}
            className="log-code-title-text"
          />
        ) : (
          <>{codeData?.title}</>
        )}
        <div>
          {isCopy ? (
            <CheckOutlined className="log-code-copy" />
          ) : (
            <CopyOutlined className="log-code-copy" onClick={copyCode} />
          )}
          {isFullScreen
            ? isShowFullScreen && (
                <ShrinkOutlined
                  onClick={() => {
                    setIsFullScreen(false);
                    onFullScreenChange && onFullScreenChange(false);
                  }}
                  className="log-code-copy"
                />
              )
            : isShowFullScreen && (
                <ArrowsAltOutlined
                  onClick={() => {
                    setIsFullScreen(true);
                    onFullScreenChange && onFullScreenChange(true);
                  }}
                  className="log-code-copy"
                />
              )}
        </div>
      </div>
      <CodeMirror
        value={codeData?.code}
        className="log-code-editor"
        extensions={[json(), EditorView.lineWrapping]}
        minHeight="172px"
        maxHeight="58vh"
        width="100%"
        theme="none"
        readOnly={true}
        editable={false}
      />
    </div>
  );
});
