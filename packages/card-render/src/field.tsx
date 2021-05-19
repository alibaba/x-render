import React from 'react';
import { message, Tooltip, Typography } from 'antd';

export const renderEllipsis = (
  dom: {} | null | undefined,
  text: any,
  item: { ellipsis: any }
) => {
  if (!item.ellipsis) {
    return <span>{dom}</span>;
  }
  return <Tooltip title={getEnumValue(text, item)}>{dom}</Tooltip>;
};

export const renderCopyable = (
  text: any,
  item: { copyable: any; ellipsis: any }
) => {
  if (item.copyable || item.ellipsis) {
    return (
      <Typography.Text
        style={{
          maxWidth: '100%',
          margin: 0,
          padding: 0,
        }}
        copyable={
          item.copyable && text
            ? {
                text,
                onCopy: () => message.success('复制成功'),
              }
            : undefined
        }
        ellipsis={item.ellipsis || false}
      >
        {getEnumValue(text, item)}
      </Typography.Text>
    );
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
export const renderDom = (val: string, item: any) => {
  if (item.valueType === 'code') {
    return renderCode(val);
  }
  const copyHoc = renderCopyable(val, item);
  const ellipsisHoc = renderEllipsis(copyHoc, val, item);
  return ellipsisHoc;
};
