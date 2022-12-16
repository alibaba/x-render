```jsx
import React, { useState, useEffect } from 'react';
import { Button, Modal, Switch } from 'antd';
import FormRender, { useForm } from 'form-render';

const Demo = () => {
  const [show, set1] = useState(false);
  const form = useForm();

  const openModal = () => {
    form.setValues({ input1: 'haha' });
    set1(true);
  };

  useEffect(() => {
    form.setValues({
      input1: 'haha2',
      listName: [
        { multiSelect: ['B', 'A'], radioName: 'c', inputName2: 'asf' },
      ],
    });
  }, []);

  return (
    <div>
      <Modal
        destroyOnClose
        open={show}
        onOk={form.submit}
        onCancel={() => {
          set1(false);
        }}
      ></Modal>
      <FormRender
        displayType="row"
        // debug
        readOnly
        // debugCss
        // mapping={{ '' }}
        form={form}
        schema={schema}
        widgets={{ mymy: Switch }}
      />
      <Button type="primary" onClick={openModal}>
        打开form
      </Button>
      <Button type="primary" onClick={form.resetFields}>
        reset
      </Button>
    </div>
  );
};

export default Demo;

var schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    input2: {
      title: '简单输入框2',
      type: 'object',
      valuePropsName: 'checked',
      widget: 'mymy',
    },
    input3: {
      title: '简单输入框3',
      type: 'html',
      default: 'sfdsfaslfkdj',
    },
    listName: {
      // widget: 'simpleList',
      props: {
        hideTitle: true,
      },
      title: '对象数组',
      description:
        '对象数组嵌套功能对象数组嵌套功能对象数组嵌套功能对象数组嵌套功能对象数组嵌套功能对象数组嵌套功能对象数组嵌套功能对象数组嵌套功能',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          multiSelect: {
            title: '多选',
            description: '下拉多选',
            type: 'array',
            items: {
              type: 'string',
            },
            enum: ['A', 'B', 'C'],
            enumNames: ['杭州', '武汉', '湖州'],
            widget: 'multiSelect',
          },
          radioName: {
            title: '单选select',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'select',
            required: true,
          },
          inputName2: {
            title: '复杂输入框',
            description: '英文或数字组合',
            type: 'string',
            min: 4,
            max: 20,
            rules: [
              {
                pattern: '^[A-Za-z0-9]+$',
                message: '请输入正确格式',
              },
            ],
          },
        },
      },
    },
  },
};
```
