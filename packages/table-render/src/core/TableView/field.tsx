import { Tooltip } from 'antd';
import React from 'react';
import Copy from './copy';

export const renderEllipsis = (
  dom: JSX.Element,
  text: any,
  item: { ellipsis: any }
) => {
  if (!item.ellipsis) {
    return (
      <span>
        <>{dom}</>
      </span>
    );
  }
  return <Tooltip title={getEnumValue(text, item)}>{dom}</Tooltip>;
};

export const renderCopyable = (
  text: any,
  item: { copyable: any; ellipsis: any }
) => {
  if (item.copyable || item.ellipsis) {
    return <Copy item={item} text={text} />
  }
  return getEnumValue(text, item);
};

export const getEnumValue = (
  text: React.ReactText,
  item: { ellipsis?: any; copyable?: any; enum?: any }
) => {
  const valueEnum = item.enum || undefined;
  return valueEnum && valueEnum[text] ? valueEnum[text] : text;
};

export const renderCode = (code: string) => {
  return code ? (
    <pre
      style={{
        padding: 16,
        overflow: 'auto',
        fontSize: '85%',
        lineHeight: 1.45,
        backgroundColor: '#f6f8fa',
        borderRadius: 3,
      }}
    >
      <code style={{ whiteSpace: 'pre-wrap' }}>{code}</code>
    </pre>
  ) : null;
};

// 渲染单元格
export const renderDom = (val: any, item: any) => {
  if (typeof val === 'object') {
    return;
  }
  if (item.valueType === 'code') {
    return renderCode(val);
  }
  const copyHoc = renderCopyable(val, item);
  const ellipsisHoc = renderEllipsis(copyHoc, val, item);
  return ellipsisHoc;
};
