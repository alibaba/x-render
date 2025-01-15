---
order: 5
title: '内置节点'
mobile: false
group: 
  title: 高级用法
  order: 1
---
# 内置节点

## 条件内置节点
内置条件节点，可以直接设置type为`Switch`使用。

条件节点的数据格式为`data:{list:[{value:"条件1",_id:"id_${随机数}"}]}`，`_id`为边数据的`sourceHandle`，以便条件和边一一对应。
有条件参数value(可以通过自定义条件节点配置面板更改配置参数)的放入list数组里面作为`IF或者ELIF`渲染，没有条件参数的，为默认执行路径`ELSE`,`ELSE`路径的固定`_id`为`id_else`,即边数据的`sourceHandle`必须为`id_else`才能链接`ELSE`链接头，比如：
```js
 {
      id: 'j8p8fnr5au9k25pb',
      source: 'kshd2hp4vqm8ww19',
      target: 'anmv2kcadqxj4k63',
      sourceHandle: 'id_else', // else路径的边
 }
```

条件节点的每个连接头只能连接一个节点，不能连接多个节点，如果要更换节点，可以通过删除已连接节点或者在连接线上新增节点的方式更换目标节点。

<code src="./demo/switchNode/index.tsx"></code>


## 自定义条件节点
 可以通过`nodeWidget`自定义节点面板的渲染，也可以通过`settingSchema`和`settingWidget`自定义在弹窗中展示的业务配置组件。
```js
  const customWidget = ({ data, index }) => {
  // data：为data.list循环数据中当前条件的item    
  // index：为data.list循环数据中当前条件的index
  return <p style={{ wordWrap: 'break-word' }}>{data?.value}-{index}</p>;
};

```
<code src="./demo/switchNode/customSwitchNode/index.tsx"></code>

## 并行节点
  内置并行节点，可以直接设置type为`Parallel`使用，并行节点的数据格式为`data:{list:[{title:"事件一",value:"值1",_id:"id_${随机数}"}]}`,`_id`为边数据的`sourceHandle`，以便条件和边一一对应。


  并行节点的每个连接头只能连接一个节点，不能连接多个节点，如果要更换节点，可以通过删除已连接节点或者在连接线上新增节点的方式更换目标节点。

<code src="./demo/parallelNode/index.tsx"></code>

## 自定义并行节点
 可通过nodeWidget自定义并行节点面板的渲染，也可以通过settingSchema和settingWidget自定义在弹窗中展示的业务配置组件。
 ```js
 const CustomParallel = ({data,index}) => {
  // data：为data.list循环数据中当前条件的item
  // index：为data.list循环数据中当前条件的index
  return <p style={{ wordWrap: 'break-word' }}>{data?.value}-{index}</p>;
}
```
<code src="./demo/parallelNode/custome/index.tsx"></code>



