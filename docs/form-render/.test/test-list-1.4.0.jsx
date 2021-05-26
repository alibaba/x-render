import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const Ha = props => {
  console.log(props, 'poadshahahahah --asd-fs-df-s-sd-f');
  return 'haha';
};

const schema = {
  type: 'object',
  properties: {
    listName: {
      title: 'list0',
      description: '对象数组嵌套功能',
      type: 'array',
      min: 2,
      max: 3,
      props: {
        hideTitle: true,
        hideMove: true,
        hideDelete: true,
        addBtnProps: {
          type: 'primary',
          children: 'nisadf',
        },
        buttons: [
          {
            html: '测试1',
            callback: 'cb1',
          },
          {
            html: '<span style="color:red">测试2<span>',
            callback: 'cb2',
          },
        ],
      },
      items: {
        type: 'object',
        widget: 'Ha',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
    },
    listName1: {
      title: 'list1',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'list1',
      min: 2,
      max: 3,
      props: {
        hideTitle: true,
        hideMove: true,
        hideDelete: true,
        buttons: [
          {
            html: '测试1',
            callback: 'cb1',
          },
          {
            html: '<span style="color:red">测试2<span>',
            callback: 'cb2',
          },
        ],
      },
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
    },
    listName2: {
      title: 'list2',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'list2',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
      props: {
        hideMove: true,
        hideDelete: true,
        buttons: [
          {
            html: '测试1',
            callback: 'cb1',
          },
          {
            html: '<span style="color:red">测试2<span>',
            callback: 'cb2',
          },
        ],
      },
    },
    listName3: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'list3',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
      props: {
        hideMove: true,
        hideTitle: true,
        hideDelete: true,
        buttons: [
          {
            html: '测试1',
            callback: 'cb1',
          },
          {
            html: '<span style="color:red">测试2<span>',
            callback: 'cb2',
          },
        ],
      },
    },
    listName4: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'list4',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
      props: {
        buttons: [
          {
            html: '测试1',
            callback: 'cb1',
          },
          {
            html: '<span style="color:red">测试2<span>',
            callback: 'cb2',
          },
        ],
      },
    },
  },
};

window.cb1 = ({ value = [], onChange, schema }) => {
  console.log(schema);
  onChange([
    ...value,
    { input1: '123', select1: 'b' },
    { input1: '122', select1: 'c' },
  ]);
};

const Demo = () => {
  const form = useForm();
  const onFinish = (formData, errorFields) => {
    if (errorFields.length > 0) {
      alert('errorFields:' + JSON.stringify(errorFields));
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender
        debug
        form={form}
        schema={schema}
        onFinish={onFinish}
        widgets={{ Ha }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
