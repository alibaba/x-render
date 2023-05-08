import React from 'react';
import './index.less';

const prefix = 'frm-widget-group';

export default (props: any) => {
  const { children, title } = props;

  return (
    <div className={prefix}>
      <div className={`${prefix}-title`}>{title}</div>
      {children}
    </div>
  )
}
