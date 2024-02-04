---
order: 0
mobile: false
---
# API

## Props

| 属性                  | 描述                                                  | 类型                      | 默认值     |
| ---------------------| ----------------------------------------------------- | -------------------      | --------- |
| defaultValue         | 默认 schema                                            |    `schema`              |     -     |
| onMount              | 首次加载完成                                            |    `Function`            |     -     |
| logo                 | logo 模块设置                                          | [Logo](#Logo)| -         | -         |
| importBtn            | 导入按钮，用于 schema 导入                               | `boolean`                |   false   |
| exportBtn            | 导出按钮，用于 schema 导出                               | `boolean`                |   false   |
| clearBtn             | 清除按钮  用于清除设计器 schema                           | `false` ｜ [Btn](#Btn)   |     -     |
| saveBtn              | 保存按钮，用于保存 schema                                | `false` ｜ [Btn](#Btn)   |     -     |
| pubBtn               | 发布按钮，用于发布 schema                                | `false` ｜ [Btn](#Btn)   |     -     |
| extraBtns            | 自定义更多按钮                                          | [Btn](#Btn) []           |     -     |

## Logo

我们将搜索相关的能力放到 `<Search />` 上面配置，包括对应的搜索筛选表单的渲染

| 属性                  | 描述                                                                      | 类型                 | 默认值     |
| --------------------- | ------------------------------------------------------------------------ | ------------------- | --------- |
| image         |   图片地址                                                                        | `string`      |   -     |
| href          |   图片点击跳转地址                                                                  | `string`    |   -     |
| title         |   标题                                                                            | `string`     |   -     |


## Btn
| 属性                  | 描述                                                                      | 类型                 | 默认值     |
| -------------------- | ------------------------------------------------------------------------  | ------------------- | --------- |
| key                 |   按钮 key                                                                  | `string`           |   必填      |
| text                 |   按钮文案                                                                  | `string`           |   -       |
| order                |   按钮顺序                                                                  | `number`           |   -       |
| onClick              |   按钮点击回调函数                                                           | `(schema) => void`  |   -       |


## Methods
通过配置 ref，获取组件实例访问，由于中间隔了一层 iframe，不要在 React useEffect 中调用方法，请使用 `onMount`
| 属性                  | 描述                                                                      | 类型                 | 默认值     |
| -------------------- | ------------------------------------------------------------------------  | ------------------- | --------- |
| getValue                 |   获取 schema                                                               | `schema`           |   -       |
| setValue                |    设置 schema                                                                  | `schema`           |   -       |