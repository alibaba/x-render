import React from 'react';
import { Form } from 'antd';
import classnames from 'classnames';
import './index.less';

const BoxSubInline = (props: any) => {
  const { children, title, hasBackground = true } = props;
  
  return (
    <Form.Item
      className={classnames('fr-obj-subinline', {
        'fr-obj-subinline-label-hidden': !title,
        'fr-obj-subinline-background': hasBackground
      })}
      label={title || 'notitle'}
      labelCol={{ xl: 3, xxl: 2 }}
      wrapperCol={{ span: 24 }}
    >
      {children}
    </Form.Item>
  );
}

export default BoxSubInline;
