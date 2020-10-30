/**
 * Updated by Tw93 on 2019-12-01.
 * 数组组件
 */

import React, { useState } from 'react';
import listHoc from '../../components/listHoc';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { isObj } from '../../base/utils';
import { Button, Modal, Drawer, Pagination } from 'antd';

const isComponent = comp => {
  const type = typeof comp;
  if (comp !== null && (type === 'function' || type === 'object')) {
    return true;
  }
  return false;
};

function FrButton({ icon, children, ...rest }) {
  let IconComponent;
  switch (icon) {
    case 'add':
      IconComponent = PlusCircleOutlined;
      break;
    case 'delete':
      IconComponent = DeleteOutlined;
      break;
    default:
      IconComponent = icon;
      break;
  }
  let iconElement;
  try {
    if (isComponent(IconComponent)) {
      iconElement = <IconComponent />;
    }
  } catch (error) {}
  return (
    <Button {...rest} size="small" icon={iconElement}>
      {children}
    </Button>
  );
}

const List = listHoc(FrButton, Pagination);

const ListWithModal = props => {
  const { options, schema, value } = props || {};
  const arrLength = (value && value.length) || 0;
  const [show, setShow] = useState(false);
  const toggle = () => setShow(o => !o);
  if (options && options.modal) {
    const config = isObj(options.modal) ? options.modal : {};
    const { text } = config;
    return (
      <div>
        <a className="pointer" onClick={toggle}>
          {text && typeof text === 'string' ? '+ ' + text : '+ 配置'}
        </a>
        <span>（{arrLength}条数据）</span>
        <Modal
          title={(schema && schema.title) || '子配置'}
          visible={show}
          onCancel={toggle}
          onOk={toggle}
          cancelText="关闭"
          width="80%"
          {...config}
          style={{ maxWidth: 800, ...config.style }}
        >
          <div className="fr-wrapper">
            <List {...props} />
          </div>
        </Modal>
      </div>
    );
  }
  if (options && options.drawer) {
    const config = isObj(options.drawer) ? options.drawer : {};
    const { text } = config;
    return (
      <div>
        <a className="pointer" onClick={toggle}>
          {text && typeof text === 'string' ? '+ ' + text : '+ 配置'}
        </a>
        <Drawer
          title={(schema && schema.title) || '子配置'}
          visible={show}
          onClose={toggle}
          width="80%"
          {...config}
        >
          <div className="fr-wrapper">
            <List {...props} />
          </div>
        </Drawer>
      </div>
    );
  }
  return <List {...props} />;
};

export default ListWithModal;
