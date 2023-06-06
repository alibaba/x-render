import React from 'react';
import { combineClass } from '../utils/common';
import TextEllipsis from '../components/TextEllipsis';

/**
 *
 * 文本组件
 */
const FTextEllipsis = (props: any) => {
  const {
    className,
    style,
    data,
    addons,

    contentStyle,
    height = 24,
    leftSlot = [],
    rightSlot = [],

  } = props;

  const parentData = addons.getParentData();

  return (
    <div className={combineClass('dtv-textellipsis', className)} style={style}>
      <TextEllipsis
        height={height}
        data={data}
        contentStyle={contentStyle}
        leftSlot={
          leftSlot && addons.renderer({ schema: leftSlot, data: parentData, addons })
        }
        rightSlot={
          rightSlot && addons.renderer({ schema: rightSlot, data: parentData, addons })
        }
      />
    </div>
  );
};

export default FTextEllipsis;
