/**
 * Updated by Tw93 on 2019-12-01.
 * 数组组件
 */

import React, { useState } from 'react';
import listHoc from '../../components/listHoc';
import * as Icons from '@ant-design/icons';
import { isObj } from '../../base/utils';
import { Button, Modal, Drawer } from 'antd';

function FrButton({ icon, children, ...rest }) {
  let iconName;
  switch (icon) {
    case 'add':
      iconName = 'PlusCircleOutlined';
      break;
    case 'delete':
      iconName = 'DeleteOutlined';
      break;
    default:
      iconName = icon;
      break;
  }
  const IconComponent = Icons[iconName];
  if (IconComponent) {
    return (
      <Button {...rest} size="small" icon={<IconComponent />}>
        {children}
      </Button>
    );
  }
  return (
    <Button {...rest} size="small">
      {children}
    </Button>
  );
}

const List = listHoc(FrButton);

const ListWithModal = props => {
  const { options, schema } = props || {};
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
        <Modal
          title={(schema && schema.title) || '子配置'}
          visible={show}
          onCancel={toggle}
          footer={null}
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
