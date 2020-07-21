import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import FormRender from '../src/antd';
import FormRender from '../src/fusion';
import '@alifd/next/dist/next.min.css';
import SCHEMA from './json/new-feature.json';

window.someCallback = (...params) => {
  console.log(params);
};

const Demo = () => {
  const [formData, setFormData] = useState(() => SCHEMA.formData);
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

  const { propsSchema, uiSchema } = SCHEMA;
  return (
    <div className="pa6">
      <button onClick={toggle}>toggle</button>
      <button onClick={submit}>click</button>
      <FormRender
        propsSchema={propsSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={setFormData}
        displayType="row"
        showDescIcon
        labelWidth={120}
        readOnly={readOnly}
        onValidate={onValidate}
        // useLogger={true}
      />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('__render_content_'));
