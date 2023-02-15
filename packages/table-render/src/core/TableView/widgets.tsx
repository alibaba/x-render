import { Tag, Tooltip } from 'antd';
import React from 'react';
import { getDate, getDateTime } from '../../utils';

const PrompText = ({ text = '', prompText = '' }) => (
  <Tooltip title={prompText || text}>
    <span>{text}</span>
  </Tooltip>
);

export default {
  tags: tags => (
    <div>
      {tags.map(tag => {
        return (
          <Tag color="volcano" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      })}
    </div>
  ),
  dateTime: value => getDateTime(value),
  date: value => getDate(value),
  tooltip: text => <PrompText text={text} />,
  status: value => {
    switch (value.status) {
      case 'Default':
        return <Tag color="blue">{value.text}</Tag>;
      case 'Error':
        return <Tag color="red">{value.text}</Tag>;
      case 'Success':
        return <Tag color="green">{value.text}</Tag>;
      default:
        return <Tag color="blue">{value.text}</Tag>;
    }
  },
};
