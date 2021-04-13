import React from 'react';
import { Input } from 'antd';
import { isUrl } from '../../utils';

const TestNode = ({ value }) => {
  const useUrl = isUrl(value);
  if (useUrl) {
    return (
      <a target="_blank" href={value}>
        测试链接
      </a>
    );
  }
  return <div>测试链接</div>;
};

export default function imageInput({ value, ...rest }) {
  return (
    <Input value={value} addonAfter={<TestNode value={value} />} {...rest} />
  );
}
