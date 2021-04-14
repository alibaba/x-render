import React, { useState } from 'react';
import { Modal, Drawer } from 'antd';
import { isObj } from '../../base/utils';
import Map from '../../components/map';

const MapWithModal = props => {
  const { options = {}, schema } = props || {};
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
          <Map {...props} />
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
          <Map {...props} />
        </Drawer>
      </div>
    );
  }
  return <Map {...props} />;
};

export default MapWithModal;
