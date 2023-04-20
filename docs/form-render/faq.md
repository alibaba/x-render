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

