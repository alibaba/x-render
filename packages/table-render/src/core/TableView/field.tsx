import { Tooltip, Progress, Space, Tag, Image, Typography } from 'antd';
import React from 'react';
import Copy from './copy';
import { isObject, isArray, isFunction } from '../../utils';


const renderLink = (value: string, item: any, { record, index } : { record: any, index: number }) =>  {
  const { ellipsis, valueTypeProps } = item;
  const { type, href, onClick } = valueTypeProps || {};

  const handleClick = () => {
    if (onClick) {
      onClick(value, record, index);
      return;
    }

    let linkUrl = href || value;
    if (typeof href === 'function') {
      linkUrl = href(value, record, index);
    }

    if (type === '_self') {
      window.location.href = linkUrl;
      return;
    }

    window.open(linkUrl);
  };

  // 省略
  if (ellipsis) {
    return (
      <Typography.Text
        style={{ width: '100%', color: '#1890ff', cursor: 'pointer' }}
        ellipsis={{ tooltip: value }}
        onClick={() => handleClick()}
      >
        {value}
      </Typography.Text>
    )
  }

  return (
    <Typography.Link onClick={handleClick}>
      {value}
    </Typography.Link>
  )
};

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
    <Tag color='blue' {...props} key={value}>{value}</Tag>
  );
}

export const renderTags = (_value: any, item: any) => {
  let value = _value;
  if (!Array.isArray(value)) {
    value = `${_value}`.split(',');
  }
  return (
    <Space style={{ flexWrap: 'wrap' }}>
      {(value || [])?.map((ite: any) => {
        let data = ite;
        if (typeof ite === 'string') {
          data = {
            name: `${ite}`,
          };
          if (isObject(item.valueTypeProps)) {
            data = {
              name: `${ite}`,
              ...item.valueTypeProps
            };
          }
        }
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
export const renderDom = (value: any, item: any, extra ?: { record: any, index: number }) => {
  const { record, index } = extra || {};

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
    return renderImage(val, item.valueTypeProps);
  }

  if (item.valueType === 'link') {
    return renderLink(val, item, { record, index });
  }

  const copyHoc = renderCopyable(val, item);
  const ellipsisHoc = renderEllipsis(copyHoc, val, item);
  return ellipsisHoc;
};
