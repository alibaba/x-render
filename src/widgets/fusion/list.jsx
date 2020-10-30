import React, { useState } from 'react';
import { Button, Icon, Dialog as Modal, Drawer, Pagination } from '@alifd/next';
import listHoc from '../../components/listHoc';
import { isObj } from '../../base/utils';

function FrButton({ icon, children, type, ...rest }) {
  let iconName;
  switch (icon) {
    case 'delete':
      iconName = 'ashbin';
      break;
    default:
      iconName = icon;
      break;
  }

  const restProps = type === 'dashed' ? rest : { ...rest, type }; // fusion不支持dashed，antd支持，这边强兼容一下

  return (
    <Button {...restProps}>
      {iconName ? <Icon type={iconName} /> : null}
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
        <a className="pointer link" onClick={toggle}>
          {text && typeof text === 'string' ? '+ ' + text : '+ 配置'}
        </a>
        <span style={{ fontSize: 14 }}>（{arrLength}条数据）</span>
        <Modal
          className="fr-wrapper"
          title={(schema && schema.title) || '子配置'}
          visible={show}
          onClose={toggle}
          footerActions={['ok']}
          onOk={toggle}
          height="80%"
          {...config}
          style={{
            maxWidth: 800,
            width: '80%',
            overflow: 'auto',
            ...config.style,
          }}
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
        <a className="pointer link" onClick={toggle}>
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
