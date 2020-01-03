<a href="https://alibaba.github.io/form-render/">
    <img width="146" src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png">
</a>

# FormRender

[![npm](https://img.shields.io/npm/v/form-render.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/form-render?_blank)
[![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/form-render.svg?style=flat-square)](https://github.com/alibaba/form-render/commits/dev)
[![NPM downloads](https://img.shields.io/npm/dm/form-render.svg?style=flat-square)](https://npmjs.org/package/form-render)
[![NPM all downloads](https://img.shields.io/npm/dt/form-render.svg?style=flat-square)](https://npmjs.org/package/form-render)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/alibaba/form-render.svg?style=flat-square)](https://github.com/alibaba/form-render/issues?utf8=%E2%9C%93&q=)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

> 通过 JSON Schema 生成标准 Form，常用于自定义搭建配置界面生成

## 了解

- <a href="https://alibaba.github.io/form-render/" target="_blank">文档官网</a>
- <a href="https://alibaba.github.io/form-render/docs/demo/index.html" target="_blank">Playground</a> / <a href="https://codesandbox.io/s/form-renderjichudemo-8k1l5?fontsize=14" target="_blank">Code Sandbox</a>
- <a href="https://alibaba.github.io/form-render/#/docs/used" target="_blank">常见场景</a>
- <a href="https://alibaba.github.io/form-render/#/docs/proptypes" target="_blank">Proptypes to Json Schema</a>
- <a href="https://github.com/alibaba/form-render/blob/master/CHANGELOG.md" target="_blank">更新日志</a>
- <a href="https://github.com/alibaba/form-render/projects/2" target="_blank">后期规划</a>

## 优势

 <img src="https://gw.alipayobjects.com/mdn/feizhu_pla/afts/img/A*wyH4Rq-EqwQAAAAAAAAAAABkARQnAQ?raw=true" width="700"/>
 
- 支持 Ant Design 和 Fusion Design 主流的视觉主题
- 使用 JSON Schema 标准协议描述表单配置，并搭配丰富类型且可扩展的组件
- 支持 1 排 N、横纵排、支持对象无限嵌套、自定义正则校验、自定义样式组件、列表拖拽等特性
- 已在淘宝、天猫、飞猪、亚博科技、安全智能、新零售行业工作台、人工智能实验室、安全智能部门等多 BU 多场景使用，简单使用同时支持复杂场景使用
- 使用上有详细文档，维护上有专人支持

## 安装

```sh
npm i form-render
# or
yarn add form-render
```

## 快速使用

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// 使用 Ant Design 体系
import FormRender from 'form-render/lib/antd';

// 使用 Fusion Design 体系
// import "@alifd/next/dist/next.min.css";
// import FormRender from "form-render/lib/fusion";

const propsSchema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      'ui:width': '50%', // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
    },
  },
};

// 也可以选择单独使用 uiSchema 字段分开定义所有的 ui 属性，适用于遵循 json schema 的团队无缝接入
const uiSchema = {
  select: {
    'ui:disabled': true,
  },
};

function Demo() {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div style={{ padding: 60 }}>
      <FormRender
        propsSchema={propsSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Demo />, rootElement);
```

### API

| Prop              |    Type    | Required |  Default   |                   Description                   |
| ----------------- | :--------: | :------: | :--------: | :---------------------------------------------: |
| **`name`**        |  `String`  |   `Y`    |  `$form`   |                   表单的名称                    |
| **`propsSchema`** |  `Object`  |   `Y`    |    `{}`    |                表单属性配置 json                |
| **`uiSchema`**    |  `Object`  |   `N`    |    `{}`    |                表单 UI 配置 json                |
| **`formData`**    |  `Object`  |   `N`    |    `{}`    |                    配置数据                     |
| **`onChange`**    | `Function` |   `Y`    | `() => {}` |                数据更改回调函数                 |
| **`onValidate`**  | `Function` |   `N`    | `() => {}` |                表单输入校验回调                 |
| **`displayType`** |  `String`  |   `N`    |  `column`  |   设置表单横向排列或者纵向排序`column`/ `row`   |
| **`readOnly`**    | `Boolean`  |   `N`    |  `false`   |               预览模式/可编辑模式               |
| **`labelWidth`**  |  `Number`  |   `N`    |   `110`    | label 的长度，指明 label 的长度（px），默认 110 |

**注 1：** 设置表单 `displayType` 为 row 时候，请设置 `showDescIcon` 为 `true`，隐藏说明，效果会更好  
**注 2：** **onChange** 方法会用于初始化表单 data，如果不写会造成没有初始值的表单元素无法渲染（出现不报错也不显示的情况）  
**注 3：** FormRender 默认布局会占满它的父级元素，建议用一个`div`包裹 FormRender 用于表单布局样式调整

### 不常用 API

| Prop               |   Type    | Required | Default |                    Description                    |
| ------------------ | :-------: | :------: | :-----: | :-----------------------------------------------: |
| **`column`**       | `Number`  |   `1`    |   `N`   | 整体布局 1 排 N，局部的 1 排 N 一般使用`ui:width` |
| **`showValidate`** | `Boolean` |   `N`    | `true`  |                 是否展示校验信息                  |
| **`showDescIcon`** | `Boolean` |   `N`    | `false` |     是否将文字形式说明显示成描述 tooltip 形式     |
| **`widgets`**      | `Object`  |   `N`    |  `{}`   |                    自定义组件                     |
| **`mapping`**      | `Object`  |   `N`    |  `{}`   |              用于修改默认组件映射表               |

## 快速书写 schema

快速准确书写 schema 一直是使用者的痛点。为此我们准备了 schema 书写利器： `form-render snippets`（vscode 插件），在 vscode 商店输入 ‘formrender’ 搜索：

<img src="https://img.alicdn.com/tfs/TB1VIfBqWL7gK0jSZFBXXXZZpXa-1976-1464.png" width="500" />

## 支持 TypeScript

详见[如何在 TypeScript 项目中使用](docs/typescript)

## 支持 Ant Design 自定义主题不被覆盖

- 安装 webpack 插件
  ```bash
  npm install webpack-plugin-fr-theme  --save-dev
  ```
- 配置 webpack.config.js 文件

  ```js
  const WebpackPluginFrTheme = require('webpack-plugin-fr-theme');

  {
      ...
      plugins: [
        new WebpackPluginFrTheme(),
      ],
      ...
  }
  ```

## 原理

FormRender 底层引擎用原生 JS 来实现，通过解析 JSON Schema 配置，并支持渲染原生的 HTML 表单，通过 UiSchema 来配置 Widget 组件，在此基础上处理好上层 Ant Design 或 Fusion 组件 Widget 和 Input Format 的对应关系，最后还可以做到无缝接入其他组件体系的好处

<img src="https://img.alicdn.com/tfs/TB1AoJUKNTpK1RjSZR0XXbEwXXa-1466-858.png" width="500"/>

## 调试

```shell
> git clone https://github.com/alibaba/form-render.git
> npm i
> npm start
```

## 支持

- 在公司或个人项目中使用 FormRender，关注 <a href="/CHANGELOG.md" target="_blank">Changelog</a>
- 如果你觉得 FormRender 还不错，可以通过 Star 来表示你的喜欢
- 加入钉钉聊天群帮忙解答使用问题

  <img src="https://qpluspicture.oss-cn-beijing.aliyuncs.com/ts-upload/IMG_8838.JPG" width="240">

## 贡献

想贡献代码、解 BUG 或者提高文档可读性？非常欢迎一起参与进来，在提交 MR 前阅读一下 [Contributing Guide](https://github.com/alibaba/form-render/blob/master/CONTRIBUTING.md)

感谢给 FormRender 贡献代码的你们！

<a href="https://github.com/alibaba/form-render/graphs/contributors"><img src="https://opencollective.com/form-render/contributors.svg?width=890&button=false"/></a>

## 协议

- 遵循 MIT 协议
- 请自由地享受和参与开源
