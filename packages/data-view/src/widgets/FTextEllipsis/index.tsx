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
    storeMethod,

    contentStyle,
    height = 24,
    leftSlot = [],
    rightSlot = [],

  } = props;

  const parentData = storeMethod.getParentData();

  return (
    <div className={combineClass('dtv-textellipsis', className)} style={style}>
      <TextEllipsis
        height={height}
        data={data}
        contentStyle={contentStyle}
        leftSlot={
          leftSlot && storeMethod.renderer({ schema: leftSlot, data: parentData, storeMethod })
        }
        rightSlot={
          rightSlot && storeMethod.renderer({ schema: rightSlot, data: parentData, storeMethod })
        }
      />
    </div>
  );
};

export default FTextEllipsis;
