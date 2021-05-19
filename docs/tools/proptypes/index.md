---
title: PropToSchema
group:
  title: PropToSchema
toc: content
---

# PropToSchema &nbsp;&nbsp;[![npm](https://img.shields.io/npm/v/proptypes-to-json-schema.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/proptypes-to-json-schema?_blank)

> 将 React PropTypes 转换生成 [JSON Schema](https://spacetelescope.github.io/understanding-json-schema/index.html)，常用于 React 模块的可视化配置参数。

## 安装

```sh
npm i proptypes-to-json-schema
```

## 使用

```js
const fs = require('fs');
const path = require('path');
const propToSchema = require('proptypes-to-json-schema');

// 参数为目标文件地址
const apiInfo = propToSchema(`${__dirname}/index.jsx`);
fs.writeFileSync(
  path.join(__dirname, 'schema.json'),
  JSON.stringify(apiInfo, null, 2)
);
```

## 说明

| 名称    | 类型   | 默认值 | 备注                                                        |
| ------- | ------ | ------ | ----------------------------------------------------------- |
| path    | string | 必填   | 需要转换的 jsx 目录地址                                     |
| options | object | `{}`   | 目前支持参数 shouldAddUi,true 会自动生成带 ui 配置的 schema |

### 目前支持

| 类型   | PropTypes | prop schema type | 默认 ui setting  | 可选 ui setting                                   |
| ------ | --------- | ---------------- | ---------------- | ------------------------------------------------- |
| 布尔值 | bool      | boolean          | checkbox         | 无                                                |
| 字符串 | string    | string           | input[type=text] | textarea、password、color、date、date-time、image |
| 数字   | number    | number           | input[type=text] | updown(步进器，搭配 min、max、step 使用)          |
| 单选项 | oneOf     | enum             | select box       | 无                                                |
| 数组项 | arrayOf   | array            | 组展示(\*1)      | 同左                                              |
| 对象   | shape     | object           | 对象展示(\*2)    | 同左                                              |

1. 子元素展示依赖于 arrayOf 的设置，类似这样设置 `PropTypes.arrayOf(PropTypes.xxx)`,其实 xxx 为前 3 种基本类型,不设置默认是字符串形式

2. 目前对象形式必须通过 PropTypes.shape 来指明类型，目前不支持嵌套对象，只支持嵌套基础类型！

### 使用规范

1. 只有添加了注释的属性，才会去提出对应信息
2. 从 defaultProps 中获取默认值
3. 从 propTypes 中获取属性类型转换成 schema 属性名
4. 注释的填写规范
   - @title 参数的标题,对应 schema 中的 title 字段，用于可视化配置中的 label
   - @description 参数的描述，对应 schema 中的 title 字段 description 字段，用于可视化中的输入提示
   - @format 特殊类型(不必须)，一般不填入，表单默认通过 input 进行输入，一般只有 string 类型才可以设置 format，目前支持 format 字段如下可见上表
   - @pattern 正则校验表达式(不必须)，主要用于字符串和数字类型的校验，假如长度限制不满足时候，可以使用和这个
   - @enumNames oneOf 场景中会渲染成一个选择的场景，可以通过 enumNames 数组字段来描述里 key 对应的 title
5. 顶部可以设置 column 字段用来表示表单展示形式为 1 排 N

   <img src="https://img.alicdn.com/tfs/TB1ZoBaPNjaK1RjSZFAXXbdLFXa-1472-622.png" width="300"/>

## 效果

<table>
  <tr>
    <td>React 输入</td>
    <td>标准Json schema 输出</td>
    <td>带 Ui 配置的 schema 输出</td>
  </tr>
  <tr>
    <td>
      <img src="https://img.alicdn.com/tfs/TB1jVQFtuuSBuNjy1XcXXcYjFXa-1004-1310.png" width="420">
    </td>
    <td>
      <img src="https://gw.alicdn.com/tfs/TB14I0Rzx1YBuNjy1zcXXbNcXXa-862-1538.png" width="310">
    </td>
    <td>
      <img src="https://gw.alicdn.com/tfs/TB1r9QFwXmWBuNjSspdXXbugXXa-898-1460.png" width="340">
    </td>
  </tr>
</table>

可以参考 [Demo](https://github.com/alibaba/form-render/tree/master/tools/proptypes-to-json-schema/demo) 中的使用
