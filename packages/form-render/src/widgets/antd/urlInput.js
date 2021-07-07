import React from 'react';
import { Input } from 'antd';
import { isUrl } from '../../utils';

const UrlNode = ({ value, prefix = '', suffix = '', label = '链接' }) => {
  const useUrl = isUrl(value);

  if (useUrl) {
    return (
      <a target="_blank" href={`${prefix}${value}${suffix}`}>
        {label}
      </a>
    );
  }

  return <div>{label}</div>;
};

export default function UrlInput({ value, urlPrefix, urlSuffix, urlLable, ...rest }) {
  return (
    <Input
      value={value}
      addonAfter={(
        <UrlNode
          value={value}
          prefix={urlPrefix}
          suffix={urlSuffix}
          label={urlLable}
        />
      )}
      {...rest}
    />
  );
}
