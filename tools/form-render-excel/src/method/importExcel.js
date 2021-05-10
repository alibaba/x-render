import React from 'react';
import { Modal, Input } from 'antd';
import { flatProperties, toBoolean, enumNamesToEnum } from '../utils';
import { get, set } from 'lodash-es';

export default (arrayData, onChange, schema) => {
  let excelText = '';
  Modal.confirm({
    title: null,
    icon: null,
    maskClosable: true,
    title: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        Excel 导入
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, fontWeight: 'normal' }}
        >
          怎么使用？
        </a>
      </div>
    ),
    content: (
      <Input.TextArea
        placeholder="去掉表头的 Excel 数据复制下来，然后在本输入框里粘贴即可。"
        onChange={event => {
          excelText = event.target.value || '';
        }}
      />
    ),
    okText: '确定',
    cancelText: '取消',
    onOk() {
      const sheetData = excelText.split('\n').map(line => line.split('\t'));
      const itemsProperties = get(schema, 'items.properties', {});
      const flatProp = flatProperties(itemsProperties, true);
      Object.keys(flatProp).forEach((keyPath, index) => {
        const prop = flatProp[keyPath];
        if (prop.type.toLowerCase() === 'number') {
          // 数字类型的，从字符串转成数字
          sheetData.forEach(lineArr => {
            lineArr[index] = Number(lineArr[index]) || lineArr[index];
          });
        } else if (prop.type.toLowerCase() === 'boolean') {
          // 布尔类型的，从字符串转成布尔
          sheetData.forEach(lineArr => {
            lineArr[index] = toBoolean(lineArr[index]);
          });
        } else if (prop.type.toLowerCase() === 'range') {
          // range类型的，从字符串转成数组
          sheetData.forEach(lineArr => {
            lineArr[index] = String(lineArr[index]).split('_');
          });
        } else if (prop.enum) {
          // 有 enum 的，可能是单选可能是多选
          if (prop.type.toLowerCase() === 'array') {
            sheetData.forEach(lineArr => {
              lineArr[index] = enumNamesToEnum(
                String(lineArr[index]).split('_'),
                prop.enum,
                prop.enumNames,
              );
            });
          } else {
            sheetData.forEach(lineArr => {
              lineArr[index] = enumNamesToEnum(
                lineArr[index],
                prop.enum,
                prop.enumNames,
              );
            });
          }
        } else if (prop.type.toLowerCase() === 'array') {
          // 复杂数组类型，直接清空
          sheetData.forEach(lineArr => {
            lineArr[index] = [];
          });
        }
      });
      const formData = sheetData.map(lineArr => {
        const retObj = {};
        Object.keys(flatProp).forEach((keyPath, index) => {
          set(retObj, keyPath, lineArr[index]);
        });
        return retObj;
      });
      onChange(formData);
    },
  });
};
