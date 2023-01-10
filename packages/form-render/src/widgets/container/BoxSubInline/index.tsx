import React from 'react';
import { Form } from 'antd';
import classnames from 'classnames';
import './index.less';

const BoxSubItem = (props: any) => {
  const { children, title, hasBackground = true } = props;
  
  return (
    <Form.Item
      className={classnames(undefined, {
        'fr-obj-subitem-label-hidden': !title,
        'fr-obj-subitem-background': hasBackground
      })}
      label={title || 'notitle'}
      labelCol={{ span: 2}}
      wrapperCol={{ span: 24 }}
    >
      {children}
    </Form.Item>
  )
}

export default BoxSubItem;
