---
order: 4
title: '内置节点'
mobile: false
group: 
  title: 最佳展示
  order: 
---
# 内置节点

## 条件内置节点
内置条件节点，可以直接设置type为`Switch`使用，条件节点的数据格式为` list:[{value:"条件1"}]`

<code src="./demo/switchNode/index.tsx"></code>


## 自定义条件节点
 可以通过`nodeWidget`自定义节点面板的渲染，也可以通过`settingSchema`和`settingWidget`自定义在弹窗中展示的业务配置组件。

<code src="./demo/switchNode/customSwitchNode/index.tsx"></code>
