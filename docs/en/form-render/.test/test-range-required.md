```jsx
import React, { useEffect } from 'react';
import { Button, message, Space } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    dateRange: {
      bind: ['startDate', 'endDate'],
      title: '日期范围',
      type: 'range',
      format: 'date',
    },
    string: {
      title: '字符串',
      type: 'string',
    },
    string2: {
      title: '字符串 2',
      type: 'string',
      bind: 'test',
      required: true,
    },
    TravelDocumentDate: {
      title: '证件有效期',
      type: 'range',
      bind: ['TravelDocumentIssueDate', 'TravelDocumentexpireDate'],
      placeholder: ['签发日期', '有效期至'],
      format: 'date',
      required: true,
    },
  },
};

const Demo = () => {
  const form = useForm();

  useEffect(() => {
    form.setValues({
      startDate: '2020-04-05',
      endDate: '2020-04-24',
      string: 'aaa',
      test: 'bbb',
    });
  }, []);

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      console.log(data);
      message.success('提交成功！');
    }
  };

  const getRemoteData = () => {
    form.setValues({ startDate: '2020-04-04', endDate: '2020-04-24' });
  };

  return (
    <div style={{ width: '400px' }}>
      <FormRender disabled form={form} schema={schema} onFinish={onFinish} />
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
```
