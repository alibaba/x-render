import React, { useReducer, useEffect } from 'react';
import FormRender from 'form-render/lib/antd';
import SCHEMA from './test.json';

const delay = ms => new Promise(res => setTimeout(res, ms));

const useSet = initState =>
  useReducer((state, action) => ({ ...state, ...action }), initState);

export default function Demo() {
  const [state, setState] = useSet({
    formData: {},
    valid: [],
    showValid: false,
    remoteData: [],
  });

  const { formData, valid, showValid, remoteData } = state;

  const getSchema = data => {
    return {
      type: 'object',
      properties: {
        string: {
          title: '字符串',
          type: 'string',
          'ui:hidden': "{{rootValue.select === 'b'}}",
          'ui:options': {
            placeholder: data ? JSON.stringify(data) : 'hello',
          },
        },
        select: {
          title: "{{formData.string === '1' ? '哈哈':'nothing'}}",
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['选项1', '选项2', '选项3'],
        },
      },
    };
  };

  useEffect(() => {
    delay(500).then(_ => {
      setState({ remoteData: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] });
    });
  }, []);

  const onSubmit = () => {
    console.log(formData);
    setState({ showValid: true });
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  const handleChange = formData => {
    setState({ formData });
  };
  const handleValidate = valid => {
    setState({ valid });
  };

  // const SCHEMA = getSchema(remoteData);

  return (
    <div style={{ padding: 60 }}>
      <div>{JSON.stringify(remoteData)}</div>
      <FormRender
        schema={SCHEMA}
        formData={formData}
        onChange={handleChange}
        onValidate={handleValidate}
        showValidate={showValid}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
