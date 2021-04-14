## 开始使用

试试看点击 `Excel 导出` 按钮，在下载的 xlsx 文件中填上几行，然后复制下表中内容，点击 `Excel 导入` 按钮，粘贴进去点确定~

```jsx
import React, { useState } from 'react';
import FR from 'form-render/lib/antd';
import HOC from 'form-render-excel';
import schema from './schema1.json';

const NFR = HOC(FR);

export default () => {
  const [formData, setFormData] = useState({});

  return (
    <NFR
      schema={schema}
      formData={formData}
      onChange={setFormData}
      showValidate={false}
      displayType="row"
    />
  );
};
```
