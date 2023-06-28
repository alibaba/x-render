import React from 'react';
import { Space, Divider } from 'antd';
import { combineClass } from '../utils/common';

const FSpace = (props: any) => {
  const {
    data,
    label,
    split = 'divider',
    className,
    style,
    labelStyle,
    spaceStyle,
    childSchema,
    addons,
    ...spaceProps
  } = props;

  return (
    <div className={combineClass('dr-space', className)} style={style}>
      {label && <span style={labelStyle}>{label}：</span>}
      <Space style={spaceStyle} split={split ? <Divider type="vertical" /> : null} {...spaceProps}>
        {childSchema.map((schema: any, index: number) =>
          addons.renderer({ key: index, schema, data, addons }),
        )}
      </Space>
    </div>
  );
};

export default FSpace;
