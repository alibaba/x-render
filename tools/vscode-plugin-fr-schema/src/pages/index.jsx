import React, { useRef } from 'react';
import Generator from 'fr-generator';
import { vsemit, vson } from './utils';

const { preview, theme = true } = window.pluginConfig;

const App = () => {
  const generator = useRef(null);

  const handleClose = () => {
    const schema = generator.current.getValue();
    vsemit('close', JSON.stringify(schema, null, 2));
  };

  vson('update', body => {
    try {
      const obj = JSON.parse(body) || {};
      generator.current.setValue(obj);
    } catch (err) {
      console.log(err);
    }
  });

  vsemit('init');

  return (
    <div
      style={{ height: '100vh' }}
      className={`${theme && 'theme'} ${preview && 'preview-mode'}`}
    >
      <Generator
        ref={generator}
        extraButtons={[
          true,
          !preview,
          false,
          false,
          !preview && {
            text: '保存',
            onClick: handleClose,
          },
        ]}
      />
    </div>
  );
};

export default App;
