import React, { useEffect } from 'react';
import { Button, Input } from 'antd';

const SimpleList = ({ name, value, onChange }) => {
  const handleChange = (val, idx) => {
    let _list = Array.isArray(value) ? value : [];
    _list[idx] = val;
    console.log(val, _list);
    onChange(name, _list);
  };

  let _list = Array.isArray(value) ? value : [];

  const handleAdd = () => {
    let _list = Array.isArray(value) ? value : [];
    _list.push('');
    onChange(name, _list);
  };

  const onMinus = idx => {
    let _list = Array.isArray(value) ? value : [];
    _list.splice(idx, 1);
    onChange(name, _list);
  };

  return (
    <div style={{ width: '100%' }}>
      {_list.map((item, idx) => {
        return (
          <div
            key={idx.toString()}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
          >
            <Input value={item} onChange={val => handleChange(val, idx)} />
            <MinusCircleOutlined
              style={{ fontSize: '20px', marginLeft: 8 }}
              onClick={() => onMinus(idx)}
            />
          </div>
        );
      })}
      <Button type="dashed" onClick={handleAdd}>
        添加图片
      </Button>
    </div>
  );
};

export default SimpleList;
