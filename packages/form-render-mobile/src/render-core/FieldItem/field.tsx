import React from 'react';
import { useUpdateEffect } from 'ahooks';

const FieldWrapper = (props: any) => {
  const { Field, fieldProps, defaultValue, ...otherProps } = props;
 
  useUpdateEffect(() => {
    otherProps.onChange(defaultValue);
  }, [JSON.stringify(defaultValue)]);

  return (
    <Field 
      {...otherProps} 
      {...fieldProps}
    />
  );
}

export default FieldWrapper; 