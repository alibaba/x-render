import React from 'react';
import { message, Tooltip, Typography } from 'antd';

export const renderEllipsis = (dom: any, text: any, item: { ellipsis: any }) => {
  if (!item.ellipsis) {
    return dom;
  }
  return <Tooltip title={text}>{dom}</Tooltip>;
};

export const renderCopyable = (
  text: any,
  item: { copyable: boolean; ellipsis: any; delete: boolean },
  style: any,
) => {
  if (!item.copyable && !item.ellipsis && !item.delete) {
    return text;
  }

  let copyable: boolean | object = false;
  if (item.copyable && text) {
    copyable = { tooltips: false, text, onCopy: () => message.success('复制成功') };
  }

  return (
    <Typography.Text
      style={{
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        ...style,
      }}
      delete={item.delete}
      copyable={copyable}
      ellipsis={item.ellipsis || false}
    >
      {text}
    </Typography.Text>
  );
};

// 渲染单元格
export const renderText = (val: string, item: any, style: any = {}) => {
  const textHoc = renderCopyable(val, item, style);
  return renderEllipsis(textHoc, val, item);
};
