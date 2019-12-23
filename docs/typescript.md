# 如何在 TypeScript 中使用 form-render

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

原因是 form-render 是 js 的组件，并没有写 typescript 的声明文件。目前在项目中成功使用 form-render 需要做以下几步：

1. 创建一个 `types` 目录，专门用来管理自己写的声明文件，将 `form-render` 的声明文件放到 `types/form-render/index.d.ts` 中。

2. 目录结构如下：

   ```
   /path/to/project
   ├── src
   |  └── index.ts
   ├── types
   |  └── form-render
   |     └── index.d.ts
   └── tsconfig.json
   ```

3. `tsconfig.json` 中需要 `include` types 文件夹

   ```json
   {
       "compilerOptions": {
   				...
       },
       "include": ["src", "types"]
   }
   ```

4. `form-render/index.d.ts` 文件如下书写, 注意使用 fusion 的同学 module 名称变为`'form-render/lib/fusion'`

   ```js
   declare module 'form-render/lib/antd' {
     import React from 'react';
     export interface FRProps {
       propsSchema: object;
       formData: object;
       onChange(data?: object): void;
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

   注：在下个版本 form-render 会完全支持 typescript，无需任何操作。敬请期待！
