---
order: 1
title: test2
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

  const submit = () => {
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
    // setTimeout(() => setData({ string: 'b' }), 0);
  }, []);

  return (
    <div>
      <FR
        formData={data}
        onChange={_onChange}
        widgets={{ MySelect }}
        schema={{
          type: 'object',
          properties: {
            string: {
              title: '字符串',
              'ui:widget': 'MySelect',
            },
            select: {
              title: '单选',
              type: 'string',
              enum: ['a1', 'b1', 'c1'],
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
