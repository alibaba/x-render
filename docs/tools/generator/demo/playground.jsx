import React, { useRef } from 'react';
import Generator from 'fr-generator';
import './index.css';

const defaultValue = {
  schema: {
    type: 'object',
    properties: {},
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const Demo = () => {
  const ref = useRef();

  const onClick = () => {
    ref.current.copyValue();
    window.open('https://x-render.gitee.io/form-render/playground');
  };

  return (
    <div style={{ height: '80vh' }}>
      <Generator
        ref={ref}
        defaultValue={defaultValue}
        extraButtons={[{ text: '去playground验证', onClick }]}
      />
    </div>
  );
};

export default Demo;
