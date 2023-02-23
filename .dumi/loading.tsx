import React from 'react';
import { Spin } from 'antd';

export default () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', paddingTop: '340px'}}>
      <Spin />
    </div>
  );
}