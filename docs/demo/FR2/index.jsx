import React, { useState, useEffect, useRef } from 'react';
import FormRender from '../../../packages/form-render/src/antd';
import { Button } from 'antd';
// import FormRender from '../../../packages/form-render/src/fusion';
// import '@alifd/next/dist/next.min.css';

const Demo = ({ schema = {} }) => {
  const [formData, setFormData] = useState(() => schema.formData);
  const [valid, setValid] = useState([]);
  const [showValid, setShowValid] = useState(false);

  const formRef = useRef();

  useEffect(() => {
    // setTimeout(() => setFormData({ crowd: { upfIdList: 'sdfsdf' } }), 1500);
  }, []);

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

  const handleClick = () => {
    formRef.current.resetData({}).then(res => {
      console.log(res);
    });
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <FormRender
        ref={formRef}
        displayType="row"
        showDescIcon
        labelWidth={120}
        onValidate={onValidate}
        onMount={() => {
          console.log(formData);
        }}
        // readOnly={true}
        {...schema}
        formData={formData}
        onChange={setFormData}
        showValidate={showValid}
      />
      <Button onClick={handleClick}>清空</Button>
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
