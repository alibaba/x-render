import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';
// import FormRender from 'form-render/lib/fusion';

const Demo = ({ schema = {} }) => {
  const [formData, setFormData] = useState(() => schema.formData);
  const [valid, setValid] = useState([]);
  const [readOnly, setReadOnly] = useState(false);

  const onValidate = _valid => {
    console.log('没有通过的校验:', _valid);
    setValid(_valid);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <FormRender
        displayType="row"
        showDescIcon
        labelWidth={120}
        {...schema}
        formData={formData}
        onChange={setFormData}
        onValidate={onValidate}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Demo;
