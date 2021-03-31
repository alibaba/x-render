import React from 'react';
import { get, set } from 'lodash';
import clearAll from './method/clearAll';
import importExcel from './method/importExcel';
import exportExcel from './method/exportExcel';

// 给 schema 中的 array 加按钮
const addButton = schema => {
  const type = get(schema, 'type');
  const itemsType = get(schema, 'items.type');
  const useExcel = get(schema, 'ui:options.useExcel');
  if (type === 'array' && itemsType === 'object' && useExcel) {
    const extraButtons = [
      { text: 'Excel 导入', callback: '_fre_import', icon: '' },
      { text: 'Excel 导出', callback: '_fre_export', icon: '' },
      { text: '清空', callback: '_fre_clear', icon: 'delete' },
    ];
    set(schema, 'ui:extraButtons', extraButtons);
  }

  const properties =
    get(schema, 'properties') || get(schema, 'items.properties');
  if (properties) {
    Object.values(properties).forEach(nextSchema => addButton(nextSchema));
  }
  return schema;
};

export default FR => ({ schema, ...rest }) => {
  // eslint-disable-next-line
  window['_fre_clear'] = clearAll;
  // eslint-disable-next-line
  window['_fre_import'] = importExcel;
  // eslint-disable-next-line
  window['_fre_export'] = exportExcel;

  return <FR schema={addButton(schema)} {...rest} />;
};
