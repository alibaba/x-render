import React, { useRef } from 'react';
import Generator from 'fr-generator';
import { vsemit, vson } from './utils';

const App = () => {
  const generator = useRef(null);
  const isPreview = window.mode === 'preview';

  const handleClose = () => {
    const schema = generator.current.getValue();
    vsemit('close', JSON.stringify(schema, null, 2));
  }

  vson('update', (body) => {
    try {
      const obj = JSON.parse(body) || {};
      generator.current.setValue(obj);
    } catch (err) {
      console.log(err);
    }
  })

  vsemit('init');

  return (
    <div className={isPreview && 'preview-mode'}>
      <Generator
        ref={generator}
        extraButtons={[
          true,
          false,
          false,
          false,
          !isPreview && {
            text: '保存',
            onClick: handleClose,
          }
        ]}
      />
    </div>
  );
};

export default App;
