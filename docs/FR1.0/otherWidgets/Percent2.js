import React, { useEffect } from 'react';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const App = ({ value = 0, onChange }) => {
  const increase = () => {
    let _value = value + 10;
    if (_value > 100) {
      _value = 100;
    }
    onChange(_value);
  };
  const decline = () => {
    let _value = value - 10;
    if (_value < 0) {
      _value = 0;
    }
    onChange(_value);
  };
  return (
    <>
      <Progress type="circle" percent={value} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};

export default App;
