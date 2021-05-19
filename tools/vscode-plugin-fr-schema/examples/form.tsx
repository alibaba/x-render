import React from 'react';
import FormRender from 'form-render/lib/antd';
import './index.less';

interface FormProps {
  value: any;
  onChange: (value) => void;
}

const Form: React.FC<FormProps> = ({ value, onChange = () => {} }) => {
  const formSchema = {
    type: 'object',
    properties: {
      tag: {
        title: '标签',
        type: 'string',
        'ui:options': {
          placeholder: '请输入',
        },
      },
      phone: {
        title: '电话',
        type: 'string',
        'ui:options': {
          placeholder: '请输入',
        },
      },
      address: {
        title: '地址',
        type: 'string',
      },
    },
    required: ['tag'],
  };

  return (
    <FormRender
      displayType="col"
      schema={formSchema}
      formData={value}
      showValidate={false}
      onChange={onChange}
    />
  );
};

export default Form;
