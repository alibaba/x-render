import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const schema = {
  type: 'object',
  properties: {
    inputName: {
      title: '简单输入框',
      type: 'string',
      placeholder: '{{formData.input2}}',
      required: '{{formData.input2 === "123"}}',
    },
    input2: {
      title: '简单输入框2',
      type: 'string',
      format: 'image',
    },
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'tableList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: "{{rootValue.select1 === 'b'}}",
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
    listName3: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'drawerList',
      props: {
        hideTitle: true,
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
    listName1: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'simpleList',
      props: {
        hideTitle: true,
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
    listName: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      props: {
        hideTitle: true,
        buttons: [
          {
            html: 'sdf',
            callback: 'someCallback',
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
  },
};

const schema2 = {
  type: 'object',
  properties: {
    fontSize: {
      title: '字体大小',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 24,
      min: 12,
      max: 64,
    },
    width: {
      title: '宽度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 280,
      min: 100,
      max: 560,
      props: {
        hideInput: true,
      },
    },
  },
  displayType: 'column',
};

const schema1 = {
  displayType: 'column',
  type: 'object',
  properties: {
    inputName1: {
      title: '简单输入框1',
      type: 'string',
      width: '33%',
    },
    inputName2: {
      title: '简单输入框2',
      type: 'string',
      hidden: true,
      width: '33%',
      default: 'sdf',
    },
    inputName3: {
      title: '简单输入框3',
      type: 'string',
      width: '33%',
    },
  },
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
        // debugCss
        form={form}
        schema={schema1}
        onFinish={onFinish}
        watch={{
          '#': {
            handler: () => {
              console.log('halllo');
            },
            immediate: true,
          },
          input2: {
            handler: () => {
              console.log('halllo from input');
            },
            // immediate: true,
          },
        }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
