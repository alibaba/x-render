import React from 'react';

const subFieldGenerator = ({
  fieldCanRedefine: can,
  Field: SourceField = null,
  props = {},
}) => args => {
  const { name, Field: RedefineField = null, ...others } = args;
  const Field = (can && RedefineField) || SourceField;
  if (Field) {
    return <Field {...props} name={name} {...others} key={name} />;
  }
  return null;
};

export default subFieldGenerator;
