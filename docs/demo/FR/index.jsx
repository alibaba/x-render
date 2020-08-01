import React, { useState, useEffect } from 'react';
import FormRender from 'form-render/lib/antd';
// import FormRender from 'form-render/lib/fusion';

const Demo = ({ schema = {} }) => {
  const [formData, setFormData] = useState(() => schema.formData);
  const [valid, setValid] = useState([]);
  const [readOnly, setReadOnly] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => setFormData({ AllString: { input: 'abv' } }), 2000);
  // }, []);

  const onValidate = _valid => {
    console.log('没有通过的校验:', _valid);
    setValid(_valid);
  };

  const toggle = () => setReadOnly(o => !o);

  const submit = () => {
    console.log(valid);
    console.log(formData);
  };

  const { propsSchema, uiSchema } = schema;
  return (
    <div style={{ maxWidth: 800 }}>
      {/* <button onClick={toggle}>readOnly</button> */}
      {/* <button onClick={submit}>click</button> */}
      <FormRender
        propsSchema={propsSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={setFormData}
        displayType="row"
        showDescIcon
        labelWidth={120}
        onValidate={onValidate}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Demo;
