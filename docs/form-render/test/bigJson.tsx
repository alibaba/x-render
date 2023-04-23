import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, Input } from 'antd';
import { get } from 'lodash';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'card',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          }
        }
      }
    }
    // obj: {
    //   type: 'object',
    //   title: '卡片主题',
    //   description: '这是一个对象类型',
    //   widget: 'collapse',
    //   column: 3,
    //   properties: {
    //     list: {
    //       title: '对象数组',
    //       description: '对象数组嵌套功能',
    //       type: 'array',
    //       widget: 'cardList',
    //       items: {
    //         type: 'object',
    //         title: '卡片主题',
    //         description: '这是一个对象类型',
    //         column: 3,
    //         widget: 'card',
    //         properties: {
    //           input1: {
    //             title: '输入框 A',
    //             type: 'string',
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
};

const getTest = (schema: any) => {

  for (let i=0; i< 500; i++) {
    schema.properties.list.items.properties[i] = {
      title: '输入框 A',
      type: 'string',
    };
    // schema.properties[i] = {
    //   title: '输入框 A',
    //   type: 'string',
    // }
  }
  return schema;
}


export default () => {
  const form = useForm();

  const _schema = getTest(schema);
  return (
    <>
      <FormRender 
        form={form} 
        schema={_schema}
        footer={true}
        onMount={() => {
          // setTimeout(() => {
          //   form.setValueByPath('list', [{ 0: 'xxxxx'}, { 1: 'xxxxx'}, { 2: 'xxxxx'},])
          // }, 1000* 5)
        }}
      />
    </>
  );
}