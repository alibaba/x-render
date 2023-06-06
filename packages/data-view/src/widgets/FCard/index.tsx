import React from 'react';
import { Card } from 'antd';
import { combineClass, isReactNodeSchema } from '../utils/common';
import './index.less';

const FCard = (props: any) => {
  const { data, childSchema, className, style, title, extra, storeMethod, ...otherProps } = props;
  let cardTitle = <div dangerouslySetInnerHTML={{ __html: title }} />;
  let cardExtra = extra;
  if (isReactNodeSchema(title)) {
    cardTitle = storeMethod.renderer({ schema: title, data, storeMethod });
  }

  if (isReactNodeSchema(extra)) {
    cardExtra = storeMethod.renderer({ schema: extra, data, storeMethod });
  }

  return (
    <Card
      className={combineClass('dtv-card', className)}
      style={style}
      {...otherProps}
      title={cardTitle}
      extra={cardExtra}
    >
      {storeMethod.renderer({ schema: childSchema, data, storeMethod })}
    </Card>
  );
};

export default FCard;
