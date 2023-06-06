import React from 'react';
import { Tooltip } from 'antd';
import { combineClass } from '../utils/common';
import './index.less';

const FTooltip = (props: any) => {
  const { data, childSchema, className, style, title, tooltip, storeMethod, ...otherProps } = props;
  const tooltipTitle = <div dangerouslySetInnerHTML={{ __html: title }} />;

  return (
    <Tooltip
      className={combineClass('dtv-tooltip', className)}
      color="#fff"
      overlayInnerStyle={{
        color: '#141414',
      }}
      {...tooltip}
      title={tooltipTitle}
    >
      <div className="content" style={{ display: 'inline-block', ...style }}>
        {storeMethod.renderer({ schema: childSchema, data, storeMethod, ...otherProps })}
      </div>
    </Tooltip>
  );
};

export default FTooltip;
