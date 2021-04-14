import React, { useState } from 'react';
import { Dialog as Modal, Drawer } from '@alifd/next';
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
        <a className="pointer link" onClick={toggle}>
          {text && typeof text === 'string' ? '+ ' + text : '+ 配置'}
        </a>
        <Modal
          title={(schema && schema.title) || '子配置'}
          visible={show}
          onClose={toggle}
          footer={false}
          {...config}
          style={{
            maxWidth: 800,
            width: '80%',
            maxHeight: '80%',
            overflow: 'auto',
            ...config.style,
          }}
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
          <Map {...props} />
        </Drawer>
      </div>
    );
  }
  return <Map {...props} />;
};

export default MapWithModal;
