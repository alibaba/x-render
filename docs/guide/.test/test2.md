### Test case

schema 是一个函数，外部改动 schema，要生效

```jsx
import React, { useReducer, useEffect } from 'react';
import FormRender from 'form-render/lib/antd';
import settings from './test.json';
import SCHEMA from './test1.json';

const delay = ms => new Promise(res => setTimeout(res, ms));

const useSet = initState =>
  useReducer((state, action) => ({ ...state, ...action }), initState);

export default function Demo() {
  const [state, setState] = useSet({
    formData: (settings && settings.formData) || {},
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
        list: {
          title: '对象数组',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              inp: {
                title: '简单输入框',
                type: 'string',
              },
              inp2: {
                title: '简单输入框2',
                type: 'string',
              },
            },
          },
        },
        ob: {
          title: '对象',
          type: 'object',
          properties: {
            ino: {
              title: '测试1',
              type: 'string',
            },
            ino2: {
              title: '测试2',
              type: 'string',
            },
          },
        },
      },
    };
  };

  const SCHEMA = getSchema(remoteData);

  useEffect(() => {
    delay(500).then(_ => {
      setState({ remoteData: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] });
    });
  }, []);

  useEffect(() => {
    delay(300).then(_ => {
      setState({
        formData: {
          select: 'c',
          string: '254546',
          ob: {
            ino2: 'x',
            ino: 'y',
          },
          list: [{ inp2: 'haha', inp: 'hehe' }],
        },
      });
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

  return (
    <div style={{ padding: 60 }}>
      <div>{JSON.stringify(remoteData)}</div>
      <FormRender
        schema={SCHEMA}
        displayType="row"
        formData={formData}
        onChange={handleChange}
        onValidate={handleValidate}
        showValidate={showValid}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
```
