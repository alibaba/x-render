/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { getValueByPath } from './utils';

const Watcher = ({ watchKey, watch, formData, firstMount }) => {
  const value = getValueByPath(formData, watchKey);
  const watchObj = watch[watchKey];

  useEffect(() => {
    const runWatcher = () => {
      if (typeof watchObj === 'function') {
        try {
          watchObj(value);
        } catch (error) {
          console.log(`${watchKey}对应的watch函数执行报错：`, error);
        }
      } else if (watchObj && typeof watchObj.handler === 'function') {
        try {
          watchObj.handler(value);
        } catch (error) {
          console.log(`${watchKey}对应的watch函数执行报错：`, error);
        }
      }
    };

    if (firstMount) {
      const immediate = watchObj && watchObj.immediate;
      if (immediate) {
        runWatcher();
      }
    } else {
      runWatcher();
    }
  }, [JSON.stringify(value), firstMount]);
  return null;
};

export default Watcher;
