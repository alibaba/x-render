---
sidebar: false
---

```jsx
/**
 * transform: true
 * compact: true
 * inline: true
 * demoUrl: 'http://www.baidu.com'
 */
import React from 'react';
import Generator from 'fr-design';

import ReactDOM from 'react-dom';

// 将 React 和 ReactDOM 绑定到全局作用域中
window.React = React;
window.ReactDOM = ReactDOM;

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator />
    </div>
  );
};

export default Demo;
```