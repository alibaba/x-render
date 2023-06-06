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
    storeMethod,
    ...spaceProps
  } = props;

  return (
    <div className={combineClass('dtv-space', className)} style={style}>
      {label && <span style={labelStyle}>{label}：</span>}
      <Space style={spaceStyle} split={split ? <Divider type="vertical" /> : null} {...spaceProps}>
        {childSchema.map((schema: any, index: number) =>
          storeMethod.renderer({ key: index, schema, data, storeMethod }),
        )}
      </Space>
    </div>
  );
};

export default FSpace;
