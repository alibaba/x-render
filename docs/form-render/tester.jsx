/**
 * transform: true
 * defaultShowCode: true
 */
import { Button, message, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import React, { useEffect, useState } from 'react';
import RichTextEditor from '../../widgets/RichText/src';
import { fakeApi } from './advanced/utils';

const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState({});

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  const test = {
    "type": "object",
    "properties": {
      "textarea_MwdXCy": {
        "title": "编辑框",
        "type": "string",
        "format": "textarea",
        "props": {
          "autoSize": {
            "minRows":4,
            "maxRows":4,
          },
          "rows": 8
        }
      }
    },
    "labelWidth": 120,
    "displayType": "row"
  }

  useEffect(() => {
    setSchema(test);
  }, []);

  const onMount = () => {
    form.setValues({ a: 1 });
  };

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
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
        onMount={onMount}
        onFinish={onFinish}
      />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
