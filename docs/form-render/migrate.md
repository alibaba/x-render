---
order: 2
title: V2 升级方案
toc: content
---
# V2 升级方案
本文档将帮助你从 1.x 升级到 2.x 版本

2.x 不在兼容 0.x 版本


## 重大改变
- formRender 底层不再自行处理表单数据的收集、校验等逻辑，而是通过 接入 antd form 来实现
- [formRender UI样式升级](/form-render/disaply/row)


## 二、有哪些不兼容的变化
### 布局调整
- 引入 antd form 的 labelCol、wrapperCol (推荐使用这种方式进行布局)

- 对于原先的布局方式也兼容，但是 inline 模式兼容存在一定问题


### API 调整
#### onFinish 提交函数
只有校验通过 onFinish 才会被触发，不在返回错误信息参数，为了兼容1.0版本，错误信息默认返回 []

- 旧
```js
const onFinish = (data, errors) => {

}
```
- 新
```js
const onFinish = (data) => {

}
```

#### validateFields
errorInfo 的出参名称发生变更

- 旧
```js
validateFields()
  .then(values => {
    /*
    values:{
        input1: 'input1 输入的值',
        select1: 'select1 选择的值',
    }
    */
  })
  .catch(errorInfo => {
    /*
    errorInfo:
      {
        data: {
          input1: 'input1 输入的值',
          select1: 'select1 选择的值',
        },
        errors: [
          { name: 'input1', error: ['input1 的error信息'] },
          { name: 'select1', error: ['select1 的error信息'] },
        ],
      }
    */
  });
```

- 新
```js
validateFields()
  .then((values) => {
    /*
  values:
    {
      username: 'username',
      password: 'password',
    }
  */
  })
  .catch((errorInfo) => {
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { name: ['password'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  });
```