import React from 'react';
import { combineClass } from '../utils/common';
import FTitle from '../FTitle';

import './index.less';

const FPanel = (props: any) => {
  const {
    className,
    style,
    data,
    addons,

    title,
    titleStyle,
    titleShowIcon,
    childSchema,
    render,
  } = props;
  
  return (
    <div className={combineClass('dtv-panel', className)} style={style}>
      {title && <FTitle data={title} showIcon={titleShowIcon} style={titleStyle} />}
      {render
        ? addons.getMethod(render)(data, props)
        : addons.renderer({ schema: childSchema, data, addons })}
    </div>
  );
};

export default FPanel;
