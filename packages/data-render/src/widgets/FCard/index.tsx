import React from 'react';
import { Card } from 'antd';
import { combineClass, isReactNodeSchema } from '../utils/common';
import './index.less';

export default (props: any) => {
  const { data, childSchema, className, style, title, extra, addons, ...otherProps } = props;

  let cardTitle = <div dangerouslySetInnerHTML={{ __html: title }} />;
  let cardExtra = extra;

  if (isReactNodeSchema(title)) {
    cardTitle = addons.renderer({ schema: title, data, addons });
  }

  if (isReactNodeSchema(extra)) {
    cardExtra = addons.renderer({ schema: extra, data, addons });
  }
  
  return (
    <Card
      className={combineClass('dr-card', className)}
      style={style}
      {...otherProps}
      title={cardTitle}
      extra={cardExtra}
    >
      {addons.renderer({ schema: childSchema, data, addons })}
    </Card>
  );
}
