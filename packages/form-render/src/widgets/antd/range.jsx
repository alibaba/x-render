import React from 'react';
import { Input } from 'antd';

export default function range({ value, onChange, name, ...rest }) {
  return (
    <Input.Group compact style={{ width: '100%', display: 'flex' }}>
      <Input
        style={
          {
            // width: 100,
            // textAlign: 'center',
          }
        }
      />
      <Input
        className="site-input-split"
        style={{
          backgroundColor: '#fff',
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
          flexShrink: 0,
        }}
        placeholder="~"
        disabled
      />
      <Input
        style={{
          borderLeftWidth: 0,
          // width: 100,
          // textAlign: 'center',
        }}
      />
    </Input.Group>
  );
}
