---
order: 2
toc: content
---

# rules (校验)

1. rules 用于描述细致的、定制化的校验，用法与 antd 类似，因为 FormRender 在底层使用了与 antd 相同的 `async-validator` 依赖。所以 [`async-validator` 文档](https://github.com/yiminghe/async-validator#type) 的所有 api 在 FormRender 中都可支持。

   ```json
   {
     "type": "object",
     "properties": {
       "count": {
         // 基础属性
         "title": "代号",
         "type": "string",
         "min": 6,
         // rules (补充校验信息)
         "rules": [
           {
             "pattern": "^[A-Za-z0-9]+$",
             "message": "只允许填写英文字母和数字"
           }
         ]
       }
     }
   }
   ```

   ```json
   "zip": {
     "title": "zip code",
     "type": "string",
     "rules": [{ "len": 8, "message": "invalid zip" }]
   }
   ```

2. 当常规字段不能满足时，可使用 `validator` 动态校验。详见 [`async-validator` 文档](https://github.com/yiminghe/async-validator#validate)

   ```js
   name: {
     type: 'string',
     required: true,
     validator: (rule, value) => value === 'muji',
   },
   ```

3. 作为 FormRender 书写的特别规则，由于以下个字段同时涉及到了展示和校验，所以已经放在“基础属性”中，而不需要在 rules 中特别注明

   ```text
   type
   format
   min
   max
   required
   ```

4. 如果想定制一类校验的文案，建议使用 `validateMessages` props 来统一覆盖校验信息

   `FormRender` 为校验提供了[默认的错误提示信息](https://github.com/alibaba/x-render/blob/master/packages/form-render/src/validateMessageCN.js)，可以通过配置 `validateMessages` 属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

   ```js
   const validateMessages = {
     required: '${title}是必选字段',
     // ...
   };

   <Form validateMessages={validateMessages} />;
   ```

   目前可以用的转义字段为 `${title}`/`${min}`/`${max}`/`${len}`/`${pattern}`, 如果有更多需求请提 [issue](https://github.com/alibaba/x-render/issues/new/choose)

5. 如果想定制单个组件必填的错误文案，请同时书写 required 和 rules：

   ```json
   "zip": {
     "title": "zip code",
     "type": "string",
     "required": true,
     "rules": [{ "len": 8, "message": "invalid zip"  },{ "required": true, "message": "zip is required"  }]
   }
   ```
