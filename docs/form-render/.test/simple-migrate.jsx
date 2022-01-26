/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './advanced/utils';
import RichTextEditor from '../../widgets/RichText/src';

const Demo = () => {
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);
  const form = useForm({
    formData,
    onChange: setFormData,
    onValidate: setValid,
    showValidate,
  });

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  const test = {
    type: 'object',
    properties: {
      select1: {
        title: '单选',
        description: '尝试选择“显示输入框”',
        type: 'string',
        enum: ['a', 'b'],
        enumNames: ['隐藏输入框', '显示输入框'],
      },
      input1: {
        title: '输入框',
        description: '尝试输入超过5个字符',
        type: 'string',
        hidden: "{{formData.select1 === 'a'}}",
      },
      StayTime: {
        title: '停留时间段',
        type: 'range',
        bind: ['StayStartTime', 'StayEndTime'],
        format: 'date',
        required: true,
      },
    },
  };

  useEffect(() => {
    setSchema(test);
    form.init();
  }, []);

  // const onFinish = (data, errors) => {
  //   if (errors.length > 0) {
  //     message.error(
  //       '校验未通过：' + JSON.stringify(errors.map(item => item.name))
  //     );
  //   } else {
  //     fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
  //   }
  // };

  const submit = () => {
    setShowValidate(true);
    console.log(valid, 'valid', formData, 'formData');
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        widgets={{
          richText: RichTextEditor,
        }}
        debug
      />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type="primary" onClick={submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
