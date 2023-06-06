import React from 'react';
import { Typography } from 'antd';
import { combineClass } from '../utils/common';
import './index.less';

const { Title } = Typography;

const FTitle = (props: any) => {
  const { className, style, data, level = 6, showType, addons, ...otherProps } = props;

  let { color, fontSize, ...otherStyle } = style || {};
  if (!fontSize && level === 6) {
    fontSize = '14px';
  }

  return (
    <div className={combineClass('dtv-title', className)} style={otherStyle}>
      {showType === 1 && <span className="view-title-icon" />}
      <Title className="view-title" level={level} style={{ color, fontSize }} {...otherProps}>
        {data}
      </Title>
    </div>
  );
};

export default FTitle;
