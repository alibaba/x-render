---
order: 1
group:
  title: 其他
nav:
  order: 1
  title: 教程
toc: false
---

## FAQ

### 1. 如何在 TypeScript 项目中使用？

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

### 2. 我引入了组件，但发现无论如何都显示不出来？

- 首先去 <a href="https://alibaba.github.io/form-render/docs/demo/index.html" target="_blank">Playground</a> 中去将对于的参数填入进去，看是否可以正常出现
- 假如可以，检查一下 onChange 回调里面是否对 formData 进行了 setState，没有的话，可能由于初始化问题没有显示，加上即可

### 3. 我的 FormRender 可以正常渲染，但是貌似 antd 的样式都没有生效？

- 在原有的 jsx 文件中，检测是否有默认 antd 的样式，或者是否引入了两个 antd 版本
- 若无样式，则加入 `import 'antd/dist/antd.css';` 样式即可
- 若两个版本，直接 `tnpm update` 即可

### 4.tooltip 如果在有其他层级元素内部，就会被遮挡，我试了调 z-index 也没用?

- 应该是父容器设置了 overflow 为 hidden，修改成 auto 应该就好了

如果有新问题，欢迎提交 PR 来补充，遇到不能解决的问题，可以添加钉钉群，寻找远程协助。
