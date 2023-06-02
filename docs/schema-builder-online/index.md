---
sidebar: false
---

```jsx
/**
 * transform: true
 * compact: true
 * inline: true
 */
import React from 'react';
import SchemaBuilder from '@xrenders/schema-builder';

import ReactDOM from 'react-dom';

// 将 React 和 ReactDOM 绑定到全局作用域中
window.React = React;
window.ReactDOM = ReactDOM;

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <SchemaBuilder importBtn={true} exportBtn={true} pubBtn={false} />
    </div>
  );
};

export default Demo;
```