# 通过表达式的方式来控制某个表单是否显示

### 概述

- 有一些场景中存在当选项为某个值的时候才显示某一项目的场景，如下所示
  <img src="https://gw.alipayobjects.com/mdn/feizhu_pla/afts/img/A*xQT3Ro38-c4AAAAAAAAAAABjARQnAQ" width="600"/>

### 如何使用

- 比如说，如上例子，当勾选字段 isLike 为 true 的时候，才显示下面的颜色选择，直接通过在需要控制的 uiWidget 上面加入`ui:dependShow`属性，写上他对应的表达式即可
- 此处需要主要，由于表达式最终会解析成 String 去执行，请确保所有的都通过字符串来表示，否则执行`true==='true'`或者`A=='A'`这一类型会报错(如 A 变量找不到)

```json
"uiSchema": {
    "objDemo": {
      "background": {
        "ui:dependShow": "'{{objDemo.isLike}}' == 'true'"
      }
    }
  },
```
