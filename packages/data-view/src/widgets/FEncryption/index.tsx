import React from 'react';
import Encryption from '../components/Encryption';
import { getValueFromKey } from '../utils/common';

/**
 *
 * 加密组件
 */
const FEncryption = (props: any) => {
  const { data, method, storeMethod, ...otherProps } = props;

  const parentData = storeMethod.getParentData();
  const dataKey = storeMethod.dataKey;

  const encryInfo: any =
    getValueFromKey({ path: 'source:encryInfo', defaultValue: {}, storeMethod }) || {};
  let showKey = (method?.showKey ?? '') + dataKey;
  if (method?.extraShowKey) {
    showKey = parentData[dataKey + method.extraShowKey];
  }

  const conent = encryInfo[showKey] || '';

  const handleClick = async (ev: any) => {
    // 传人外置方法，实现按钮点击事件
    let funcName = 'getEncryInfo'; // 默认使用这个方法
    if (typeof method === 'string') {
      funcName = method;
    }
    if (method?.name) {
      funcName = method.name;
    }

    const func = storeMethod.getMethod(funcName);
    func({ dataKey, method, data: parentData }, ev);
  };

  return (
    <Encryption
      label={conent ? null : data}
      data={conent}
      onClick={handleClick}
      {...otherProps}
      iconFontUrl={storeMethod.getConfig().iconFontUrl}
    />
  );
};

export default FEncryption;
