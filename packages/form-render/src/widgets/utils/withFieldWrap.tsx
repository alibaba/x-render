import React from 'react';

export default (Field: any) => {
  return (props: any) => {
    const { addons, schema, ...rest } = props;
    return <Field {...rest} />;
  };
}