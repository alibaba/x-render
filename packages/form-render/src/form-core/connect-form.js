import React, { forwardRef } from 'react';
import { Form } from 'antd';
const { useForm } = Form;

const connectForm = Component => {
  return forwardRef((props, ref) => {
    const form = useForm();
    return <Component ref={ref} {...props} form={form} />;
  });
};

export default connectForm;
