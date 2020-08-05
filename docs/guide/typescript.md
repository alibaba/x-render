---
order: 3
nav:
  order: 1
  title: 教程
---

# 在 TypeScript 中使用

在 typescript 中使用直接引入 from-render，会报以下错误：

![](https://img.alicdn.com/tfs/TB14eJFrUT1gK0jSZFrXXcNCXXa-1003-202.png)

```js
/Users/nasa/code/try/cra-ts/src/App.tsx
TypeScript error in /Users/nasa/code/try/cra-ts/src/App.tsx(2,24):
Could not find a declaration file for module 'form-render/lib/antd'. '/Users/nasa/code/try/cra-ts/node_modules/form-render/lib/antd.js' implicitly has an 'any' type.
  Try `npm install @types/form-render` if it exists or add a new declaration (.d.ts) file containing `declare module 'form-render/lib/antd';`  TS7016

    1 | import React, { useState } from 'react';
  > 2 | import FormRender from 'form-render/lib/antd';
      |                        ^
    3 | import SCHEMA from './schema.json';
    4 |
    5 | const App: React.FC = () => {
```

因为 form-render 是以 JavaScript 书写，缺少 typescript 的声明文件。
目前在 ts 项目中使用 form-render 只需自己创建一个 `index.d.ts`，具体如下：

1. 在 `src` 中创建一个 `types` 目录，用来存放所有声明文件 `index.d.ts`。

目录结构如下：

```
/path/to/project
├── src
|  ├── index.ts
|  └── types
|        └── index.d.ts
|
└── tsconfig.json
```

2. `index.d.ts` 文件如下书写。注意使用 fusion 的同学 module 名称变为`'form-render/lib/fusion'`

   ```js
   declare module 'form-render/lib/antd' {
     import React from 'react';
     export interface FRProps {
       schema: object;
       formData: object;
       onChange(data?: object): void;
       onMount(data?: object): void;
       name?: string;
       column?: number;
       uiSchema?: object;
       widgets?: any;
       FieldUI?: any;
       fields?: any;
       mapping?: object;
       showDescIcon?: boolean;
       showValidate?: boolean;
       displayType?: string;
       onValidate: any;
       readOnly?: boolean;
       labelWidth?: number | string;
     }
     class FormRender extends React.Component<FRProps> {}
     export default FormRender;
   }
   ```

   如此就大功告成啦！笔者在 codesandbox 建了一个[完整的样例](https://codesandbox.io/s/zaitypescriptxiashiyongform-render-f309f)，供大家参考。

   注：form-render 会在后续完全支持 typescript 用户，无需更多操作。敬请期待！
