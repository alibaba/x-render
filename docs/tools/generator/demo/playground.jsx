import React, { useRef } from 'react';
import Generator from 'fr-generator';
import './index.less';

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
    window.open('/playground');
  };

  return (
    <div className="fr-generator-playground" style={{ height: '80vh' }}>
      <Generator
        ref={ref}
        defaultValue={defaultValue}
        extraButtons={[{ text: '去playground验证', onClick }]}
      />
    </div>
  );
};

export default Demo;
