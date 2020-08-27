import React, { useState, useEffect } from 'react';
import FormRender from '../../../src/antd';
import { Button } from 'antd';
// import FormRender from '../../../src/fusion';

const Demo = ({ schema = {} }) => {
  const [formData, setFormData] = useState(() => schema.formData);
  const [valid, setValid] = useState([]);
  const [showValid, setShowValid] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => setFormData({ number: 12 }), 500);
  // }, []);

  const onValidate = _valid => {
    console.log('没有通过的校验:', _valid);
    setValid(_valid);
  };

  const handleSubmit = () => {
    setShowValid(true);
    console.log(valid, formData);
    if (valid.length > 0) {
      return;
    }
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <FormRender
        {...schema}
        formData={formData}
        onChange={setFormData}
        displayType="row"
        showDescIcon
        labelWidth={120}
        onValidate={onValidate}
        showValidate={showValid}
      />
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
