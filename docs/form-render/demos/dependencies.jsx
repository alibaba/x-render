import { Button, Input, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import React, { useEffect } from 'react';

const { TextArea } = Input;

const Demo = () => {
  const form = useForm();

  const schema = {
    type: 'object',
    displayType: 'row',

    properties: {
      // select1: {
      //   title: '输入框',
      //   type: 'string',
      //   dependencies: ['useSelect'],
      //   widget: 'MyTextEditor',
      //   width: '60%',
      // },
      // useSelect: {
      //   title: '输入框高度',
      //   type: 'number',
      //   width: '60%',
      // },
      image1: {
        title: '图片展示',
        type: 'string',
        format: 'image'
      },
    },
  };

  useEffect(() => {
    form.setValues({
      image1: 'https://img.alicdn.com/imgextra/i3/O1CN01J3IrQO1PrUx7YIpuM_!!6000000001894-2-tps-1136-674.png'
    })
  }, [])

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      message.success('提交成功：' + JSON.stringify(data));
    }
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        widgets={{ MyTextEditor }}
        onFinish={onFinish}
        readOnly={true}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

const MyTextEditor = props => {
  const { addons } = props;
  console.log(addons.dependValues);
  let rows;
  if (addons && addons.dependValues) {
    rows = addons.dependValues[0] || 2;
  }
  return <TextArea rows={rows} />;
};

export default Demo;
