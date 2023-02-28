import { Tooltip, Progress, Space, Tag, Image } from 'antd';
import React from 'react';
import Copy from './copy';
import { isObject, isArray, isFunction } from '../../utils';


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
  return <Tooltip title={text}>{dom}</Tooltip>;
};

export const renderCopyable = (
  text: any,
  item: { copyable: any; ellipsis: any }
) => {
  if (item.copyable || item.ellipsis) {
    return <Copy item={item} text={text} />
  }
  return text;
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

export const renderProgress = (value: any, props: any) => {
  return (<Progress percent={value} {...props} />)
}

export const renderTag = (value: any, props: any) => {
  return (
    <Tag {...props}>{value}</Tag>
  );
}

export const renderTags = (value: any, item: any) => {
  return (
    <Space style={{ flexWrap: 'wrap' }}>
      {value?.map((ite: any) => {
        let data = ite;
        if (isFunction(item.valueTypeProps)) {
          data = item.valueTypeProps(ite);
        }

        const { name, ...otherProps } = data;
        return renderTag(name, otherProps);
      })}
    </Space>
  );
}

export const renderImage = (value, props) => {
  return (
    <Image width={80} src={value} {...props}
    />
  );
}

// 渲染单元格
export const renderDom = (value: any, item: any) => {
  let val = value;

  if (item.enum && !isObject(val) && !isArray(val)) {
    val = item.enum[value] ?? (item.enum.default || value);
  }

  if (item.valueType === 'tags') {
    return renderTags(val, item);
  }

  if (typeof val === 'object') {
    return;
  }

  if (item.valueType === 'code') {
    return renderCode(val);
  }

  if (item.valueType === 'progress') {
    return renderProgress(val, item.valueTypeProps);
  }

  if (item.valueType === 'tag') {
    return renderTag(val, item.valueTypeProps)
  }

  if (item.valueType === 'image') {
    return renderImage(value, item.valueTypeProps);
  }

  const copyHoc = renderCopyable(val, item);
  const ellipsisHoc = renderEllipsis(copyHoc, val, item);
  return ellipsisHoc;
};
