import React from 'react';
import { Card, Form} from 'antd';
import classnames from 'classnames';
import './index.less';

const BoxCard = (props: any) => {
  const { children, title, hasBackground = true } = props;


  return (
    <Form.Item
      className={classnames(undefined, {
        'fr-item-label-hidden': !title,
        'fr-boxline-background': hasBackground
      })}
      label={title || 'notitle'}
      labelCol={{ span: 2}}
      wrapperCol={{ span: 22 }}
    >
      {children}
    </Form.Item>
  )
}

export default BoxCard;
