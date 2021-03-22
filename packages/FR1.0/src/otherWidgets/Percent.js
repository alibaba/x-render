import React, { useEffect } from 'react';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const App = ({ percent = 0, onPress = () => {} }) => {
  const increase = () => {
    let _percent = percent + 10;
    if (_percent > 100) {
      _percent = 100;
    }
    onPress(_percent);
  };
  const decline = () => {
    let _percent = percent - 10;
    if (_percent < 0) {
      _percent = 0;
    }
    onPress(_percent);
  };
  return (
    <>
      <Progress type="circle" percent={percent} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};

export default App;
