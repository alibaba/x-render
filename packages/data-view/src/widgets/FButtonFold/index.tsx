import React, { useState } from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { combineClass } from '../utils/common';
import './index.less';

const FButtonFold = (props: any) => {
  const {
    data,
    content,
    storeMethod,
    className,
    method,
    childSchema,
    expandRender,
    ...otherProps
  } = props;

  const [isExpand, setExpand] = useState(false);

  const handleClick = async (ev: any) => {
    setExpand(!isExpand);
    // 传人外置方法，实现按钮点击事件
    if (method) {
      const func = storeMethod.getMethod(method?.name || method);
      func(data, method);
      return;
    }
  };

  let expandContent;
  if (expandRender) {
    expandContent = storeMethod.getMethod(expandRender)(data);
  }

  return (
    <>
      <Button
        className={combineClass('dtv-button-fold', className)}
        type="link"
        {...otherProps}
        onClick={handleClick}
      >
        {content}
        <DownOutlined rotate={isExpand ? 180 : 0} />
      </Button>
      {isExpand && (
        <div style={{ width: '100%' }}>
          {expandRender
            ? expandContent
            : storeMethod.renderer({ schema: childSchema, data, storeMethod })}
        </div>
      )}
    </>
  );
};

export default FButtonFold;
