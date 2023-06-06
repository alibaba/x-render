import React from 'react';
import { combineClass } from '../utils/common';
import FTitle from '../FTitle';

import './index.less';

const FPanel = (props: any) => {
  const {
    className,
    style,
    data,
    storeMethod,

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
        ? storeMethod.getMethod(render)(data, props)
        : storeMethod.renderer({ schema: childSchema, data, storeMethod })}
    </div>
  );
};

export default FPanel;
