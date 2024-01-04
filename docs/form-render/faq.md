---
order: 1
toc: content
mobile: false
group: 
  title: 其他
  order: 5
---



<!-- ---
order: 11
toc: false
--- -->
# 常见问题

##### 1. 只读模式下，默认的渲染不能满足要求我想定制怎么办？

参见[只读模式下的自定义组件](/form-render/advanced-widget#只读模式下的自定义组件)

##### 2. 我试着使用 form.setValues, 但是被 set 的值还是空的？

form-render 有生命周期的概念，请在 onMount 这个钩子里 set。

##### 3. type 为 object 类型自定义组件没有接收到 value 与 onChange 属性 

例如下面这种 Schema 结构的自定义组件，2.x 会判定它是容器组件并非表单控件，那如何解决这种误判呢？增加一个 widgetType: 'field'
```js
{
  type: "object",
  widget: "WidgetObj",
  properties: {
    name: {
      title: "name",
      type: "string",
    }
  }
}
```