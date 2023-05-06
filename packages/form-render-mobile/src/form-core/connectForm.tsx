import React, { forwardRef } from 'react';
import useForm from '../models/useForm';

export default (Component: React.FC<any>) => {
  return forwardRef((props, ref) => {
    const form = useForm();

    return <Component ref={ref} {...props} form={form} />;
  });
}