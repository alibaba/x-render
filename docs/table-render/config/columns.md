---
order: 3
title: columns
nav:
  order: 2
  title: 配置项
toc: menu
---

# columns 补充 api

### valueType

Table-Render 封装了一些常用的值类型来减少重复的 render 操作，配置一个 valueType 即可展示格式化响应的数据，具体使用可参考：[如何使用 valueType](/demo#使用-valuetype)。

- 类型：`string`
- 默认值：text

| 属性     | 描述                                                               |
| -------- | ------------------------------------------------------------------ |
| text     | 普通的文本类型                                                     |
| date     | 当数据是日期类型的返回时，会自动将格式转换为 '2020-10-20'          |
| dateTime | 当数据是日期类型的返回时，会自动将格式转换为 '2020-10-20 19:30:00' |
| money    | 当数据是金额时，会自动将格式转换为 '¥999,999,999.99'               |

陆续添加中...

### enum

当前列值的枚举，具体使用方法可参考：[如何使用 enum](/demo#使用-enum)

- 类型：`object`

```typescript
interface IValueEnum {
  [val: any]: text;
}
```

- eg:

```javascript
enum:{
  0:'未解决',
  1:'已解决'
}
```
