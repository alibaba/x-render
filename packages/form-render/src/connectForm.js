import React from 'react';
import { useForm } from './useForm';

export const connectForm = Component => {
  return props => {
    const form = useForm();
    return <Component {...props} form={form} />;
  };
};
