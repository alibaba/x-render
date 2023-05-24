import React from 'react';
import { Input, Button, Switch } from 'antd';
import Form, { useForm } from 'form-render';
import type { WidgetProps } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: 'ReadOnly widget',
      type: 'string',
      widget: 'SiteInput',
      readOnlyWidget: 'SiteInput',
    },
  },
};

const SiteInput = ({ readOnly, value, ...rest }: WidgetProps) => {
  if (readOnly) return <a href={`https://${value}.com`}>{`https://${value || ''}.com`}</a>;
  return (
    <Input addonBefore="https://" addonAfter=".com" value={value} {...rest} />
  );
};

const Demo = () => {
  const form = useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  return (
  <div>
    <Switch
      style={{ marginBottom: 10 }}
      onChange={(checked) => setReadOnly(checked)}
      checkedChildren="只读"
      unCheckedChildren="编辑"
    />
    <Form
      form={form}
      schema={schema}
      widgets={{ SiteInput }}
      readOnly={readOnly}
    />
  </div>
  );
};

export default Demo;
