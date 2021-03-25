---
order: 1
title: test
nav:
  order: 1
  title: 教程
---

```jsx
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import FR from 'form-render/lib/antd';
// import FR from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';

export default () => {
  const [data, setData] = useState();
  const [valid, onValid] = useState([]);

  const submit = () => {
    if (valid.length > 0) {
      console.log(valid);
      return;
    }
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setData({ date1: 1612195207000 });
  //   }, 500);
  // }, []);

  const _onChange = data => {
    setData(data);
  };

  useEffect(() => {
    setData({ string: 'b' });
  }, []);

  return (
    <div>
      <FR
        formData={data}
        onValidate={onValid}
        onChange={_onChange}
        widgets={{ MySelect }}
        schema={{
          type: 'object',
          properties: {
            pwd: {
              title: '密码',
              type: 'string',
              validator: "{{value.length > 6 ? '长度超了': ''}}",
            },
            pwd2: {
              title: '重复输入密码',
              type: 'string',
              validator: "{{formData.pwd == value ? '': '两个密码不一致'}}",
            },
          },
        }}
      />
      <button onClick={submit}>haha</button>
    </div>
  );
};

const LIST = ['a', 'b', 'c'];

const MySelect = props => {
  const { style = {}, name, value = '', onChange, isEditing } = props;

  useEffect(() => {
    if (!value) {
      setTimeout(() => {
        onChange(name, LIST[0]);
      }, 0);
    }
  }, []);

  const handleChange = value => {
    // 为了兼容 FormRender，所以需要有下面的 name 判断，一般的组件封装直接通过回调函数把value带回去就行了，这里的onChange(name, value)主要是为了保证FR知道自定义组件的key
    onChange(name, value);
  };

  return (
    <Select
      value={value || LIST[0]}
      style={{ ...style, width: '100%' }}
      onChange={handleChange}
    >
      {LIST.map((d, index) => (
        <Select.Option value={d} key={index}>
          <span>{`${d}`}</span>
        </Select.Option>
      ))}
    </Select>
  );
};
```
