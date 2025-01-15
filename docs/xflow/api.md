---
order: 1
title: 'API'
mobile: false
group: 
  title: 'API'
  order: 3
---
# API

## XFlow

| 属性          | 描述                                 | 类型                                                                                        | 默认值  |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- | ------- |
| initialValues | 初始的节点和边数据                   | `{nodes:any[],edges:any[]}`                                                                 | -       | - |
| layout        | 节点布局的方向                       | `LR \| TB`                                                                                  | LR      | - |
| widgets       | 自定义组件                           | `Record<string, ReactNode>`                                                                 | -       | - |
| settings      | 节点配置，定义页面中可拖动的节点配置 | ( [TNodeGroup](#tnodegroup) \| [TNodeItem](#tnodeitem) )[ ]                                 |         |
| nodeSelector  | 节点选择器配置，可控制节点的可搜索性 | `TNodeSelector`                                                                             |
| iconFontUrl   | iconfont url，用于配置图标渲染       | `String`                                                                                    |         |
| globalConfig  | 全局的面板和节点配置                 | {nodePanel:[TNodePanel](#tnodepanel),nodeView:[TNodeView](#tnodeview),edge:[TEdge](#tedge)} |         |
| logPanel      | 日志面板配置                         | [TLogPanel](#tlogpanel)                                                                     |         |
| onNodeClick   | 节点点击事件                         | `NodeMouseHandler`                                                                          |         |
| antdVersion   | antd 的版本                          | `V4 \| V5`                                                                                  | `V5`    |
| readOnly      | 只读模式                             | `boolean`                                                                                   | `false` |
| onTesting      | 单点调试方法                             | `(node,nodes)=>void`                                                                                   |  |


## TNodePanel

面板相关配置

| 属性     | 描述                               | 类型               | 默认值 |
| -------- | ---------------------------------- | ------------------ | ------ |
| width    | 设置配置面板宽度                   | `string \| number` | 400    |
| hideDesc | 是否在配置面板中显示节点的描述信息 | `boolean`          | false  |



## TNodeView

节点相关配置

| 属性          | 描述                                                                           | 类型                                | 默认值 |
| ------------- | ------------------------------------------------------------------------------ | ----------------------------------- | ------ |
| hideTitleTips | 是否隐藏节点标题的tooltip描述信息提示                                          | `boolean`                           | false  |
| status        | 节点状态自定义配置,自定义节点不同状态的颜色展示。name:状态名称，color:颜色值。 | `Array<{name:string;color:string}>` | []     |

## TEdge

边的全局配置

| 属性           | 描述                                       | 类型      | 默认值 |
| -------------- | ------------------------------------------ | --------- | ------ |
| hideEdgeAddBtn | 是否隐藏两个节点之间，连线上的增加节点按钮 | `boolean` | false  |

## TNodeGroup

节点分组配置

| 属性  | 描述         | 类型          | 默认值 |
| ----- | ------------ | ------------- | ------ |
| title | 分组名称     | `string`      |        |
| type  | 分组类型     | `_group`      | _group |
| items | 节点配置信息 | `TNodeItem[]` |        |

## TLogPanel

日志面板配置

| 属性      | 描述                | 类型                          | 默认值 |
| --------- | ------------------- | ----------------------------- | ------ |
| logList   | 日志面板数据        | [TLogListItem](#tloglistitem) |        |
| loading   | 日志面板loading效果 | `boolean`                     | false  |
| logWidget | 自定义日志面板展示  | `string`                      |        |
| width | 日志面板宽度 | `number`                      | 400       |


## TLogListItem

日志面板数据格式

| 属性        | 描述                                                                                          | 类型                                                                                                | 默认值 |
| ----------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| statusPanel | 日志面板数据,isBadge是否以badge形式展示状态                                                   | `{status: Array<{ label: string; value?: string; isBadge?: boolean }>;extra?: string \| ReactNode}` |        |
| codePanel   | 代码面板数据渲染，如果没有 codePanel，则不渲染代码面板。title:代码面板标题，code:代码面板数据 | `Array<{ title: string; code: string }>`                                                            |        |
| nodeId      | 节点ID，必填                                                                                  | `string`                                                                                            |        |



## TNodeItem

单个节点配置

| 属性               | 描述                                                                                                                                             | 类型                                                                                                                                                            | 默认值 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| title              | 节点名称                                                                                                                                         | `string`                                                                                                                                                        |        |
| type               | 节点类型                                                                                                                                         | `string`                                                                                                                                                        |        |
| hidden             | 是否在配置面板中显示节点                                                                                                                         | `boolean`                                                                                                                                                       | false  |
| targetHandleHidden | 是否隐藏左侧输入连接头                                                                                                                           | `boolean`                                                                                                                                                       | false  |
| sourceHandleHidden | 是否隐藏右侧输出连接头                                                                                                                           | `boolean`                                                                                                                                                       | false  |
| icon               | 节点的图标配置                                                                                                                                   | `{type:string;bgColor:string}`                                                                                                                                  |        |
| iconSvg            | 节点的图标配置Svg格式                                                                                                                            | `SVGSVGElement`                                                                                                                                                 |        |
| settingSchema      | 节点的业务配置信息，详见[form-render 文档](/form-render/api-schema)。同时设置`settingSchema`和`settingWidget`只生效`settingWidget`               | <a target="_blank" href="https://github.com/alibaba/x-render/blob/e2feff8fdb3bef5537b92a2157dbbf40b9d4eb17/packages/form-render/src/type.ts#L32">SchemaBase</a> |        |
| settingWidget      | 自定义节点的业务配置组件，在弹窗中展示。同时设置`settingSchema`和`settingWidget`只生效`settingWidget`。定义之后需要在`widgets`中引入自定义组件。 | `string`                                                                                                                                                        |        |
| settingWidgetProps | 用于向`settingWidget`自定义组件中传递自定义参数                                                                                                  | `object`                                                                                                                                                        |        |
| nodeWidget         | 自定义节点的业务配置信息展示组件，在节点内部展示业务配置信息。定义之后需要在`widgets`中引入自定义组件。                                          | `string`                                                                                                                                                        |        |
| nodePanel          | 自定义节点的面板配置信息                                                                                                                         | [TNodePanel](#tnodepanel)                                                                                                                                       |        |
| switchExtra        | 条件节点属性配置                                                                                                                               | [TSwitchExtra](#tswitchextra)                                                                                                                                   |        |
| parallelExtra        | 并行节点属性配置                                                                                                                               | [TParallelExtra](#tparallelextra)                                                                                                                                   |        |
| showTestingBtn      |  是否展示节点的单点调试按钮                      | `boolean`                                                                                   | `false` |




## TNodeSelector

| 属性       | 描述             | 类型                                                        | 默认值 |
| ---------- | ---------------- | ----------------------------------------------------------- | ------ |
| showSearch | 节点是否可被搜索 | `boolean`                                                   | false  |
| items      | 节点配置         | ( [TNodeGroup](#tnodegroup) \| [TNodeItem](#tnodeitem) )[ ] |        |

## TSwitchExtra

| 属性     | 描述                             | 类型      | 默认值 |
| -------- | -------------------------------- | --------- | ------ |
| hideElse | 隐藏条件节点ELSE分支（默认分支） | `boolean` | false  |
| valueKey | 自定义节点 value 的字段          | `string`  |        |
| titleKey | 自定义节点 title 的字段          | `string`  |        |

## TParallelExtra

| 属性     | 描述                             | 类型      | 默认值 |
| -------- | -------------------------------- | --------- | ------ |
| valueKey | 自定义节点 value 的字段          | `string`  |        |
| titleKey | 自定义节点 title 的字段          | `string`  |        |
