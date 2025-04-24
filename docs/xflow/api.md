---
order: 1
title: 'API'
mobile: false
group: 
  title: 'API文档'
  order: 3
---
# API

## XFlow

| 属性          | 描述                                 | 类型                                                                                        | 默认值  |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- | ------- |
| initialValues | 初始的节点和边数据                   | `{nodes:Array<{id:string;type:string;data:Record<string,any>;position:{x:number;y:number}}>,edges:Array<{id:string;source:string;target:string}>}` | -       | - |
| layout        | 节点布局的方向                       | `LR \| TB`                                                                                  | LR      | - |
| widgets       | 自定义组件                           | `Record<string, ReactNode>`                                                                 | -       | - |
| settings      | 节点配置，定义页面中可拖动的节点配置 | ( [TNodeGroup](#tnodegroup) \| [TNodeItem](#tnodeitem) )[ ]                                 |         |
| nodeSelector  | 节点选择器配置，可控制节点的可搜索性 | `TNodeSelector`                                                                             |
| iconFontUrl   | iconfont url，用于配置图标渲染       | `String`                                                                                    |         |
| globalConfig  | 全局的面板和节点配置                 | {nodePanel:[TNodePanel](#tnodepanel),nodeView:[TNodeView](#tnodeview),edge:[TEdge](#tedge),controls:[TControl](#tcontrol),handle:[THandle](#thandle),deleteKeyCode:[TdeleteKeyCode](#tdeletekeycode)  } |         |
| logPanel      | 日志面板配置                         | [TLogPanel](#tlogpanel)                                                                     |         |
| onNodeClick   | 节点点击事件                         | `NodeMouseHandler`                                                                          |         |
| antdVersion   | antd 的版本                          | `V4 \| V5`                                                                                  | `V5`    |
| readOnly      | 只读模式                             | `boolean`                                                                                   | `false` |
| onTesting      | 单点调试方法                             | `(node,nodes)=>void`                                                                                   |  |
| onMenuItemClick | 点击节点右上角复制粘贴删除功能， 支持自定义和默认行为 | (itemInfo: [ItemInfo](#iteminfo), defaultAction: () => void) => void | - |
| clickAddNode | 自定义添加节点逻辑 | `(type: string, nodeItem: TNodeItem, addNode: (initData?: Record<string,any>) => void) => void` | - |


## TNodePanel

面板相关配置

| 属性     | 描述                               | 类型               | 默认值 |
| -------- | ---------------------------------- | ------------------ | ------ |
| width    | 设置配置面板宽度                   | `string \| number` | 400    |
| hideDesc | 是否在配置面板中显示节点的描述信息 | `boolean`          | false  |
| onClose | 配置面板关闭事件 | `(nodeID:string)=>void`          |   |




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
| hideEdgeDelBtn | 是否隐藏两个节点之间，连线上的删除按钮, 需要配合deletable一起使用 | `boolean` | false  |
| deletable | 配置边是否可用快捷键删除，如果需要同时隐藏删除按钮，则需要设置deletable为true | `boolean` | true  |

## TControl

工具栏控制面板功能的配置。

| 属性           | 描述                                       | 类型      | 默认值 |
| -------------- | ------------------------------------------ | --------- | ------ |
| hideAddNode | 是否隐藏增加节点功能 | `boolean` | false  |
| hideAnnotate | 是否隐藏注释节点功能 | `boolean` | false  |
| hideUndoRedoBtns | 是否隐藏撤销和重做按钮 | `boolean` | false  |


## THandle

Handle 配置继承自 React Flow 的 Handle 配置，用于控制节点连接点的行为。更多 Handle 相关的配置可以参考 [React Flow Handle API](https://reactflow.dev/docs/api/nodes/handle/)。

| 属性               | 描述                                       | 类型      | 默认值 |
| -------------- | ------------------------------------------ | --------- | ------ |
| isValidConnection | 验证连接是否有效，返回 true 则允许连接 | `(connection: Connection) => boolean` | - |
| onConnect | 连接建立时的回调 | `(params: Connection) => void` | - |


## TDeleteKeyCode

删除键配置，用于控制删除节点和边的快捷键。

| 属性           | 描述                                       | 类型      | 默认值 |
| -------------- | ------------------------------------------ | --------- | ------ |
| deleteKeyCode | 设置删除节点和边的快捷键，可以是单个键或多个键的数组，设置为 null 则禁用快捷键删除功能 | `string \| string[] \| null` | 'Backspace' |

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

| 属性                | 描述                | 类型                                      | 默认值 |
| ------------------------------- | ----------------------------------------------------------- | ---------------------------------- | ------ |
| title              | 节点名称                                                                                                                                         | `string`                                                                                                                                                        |        |
| type               | 节点类型                                                                                                                                         | `string`                                                                                                                                                        |        |
| description              | 节点描述                                                                                                                                         | `string`                                                                                                                                                        |        |
| hidden             | 是否在配置面板中显示节点                                                                                                                         | `boolean`                                                                                                                                                       | false  |
| targetHandleHidden | 是否隐藏左侧输入连接头                                                                                                                           | `boolean`                                                                                                                                                       | false  |
| sourceHandleHidden | 是否隐藏右侧输出连接头                                                                                                                           | `boolean`                                                                                                                                                       | false  |
| icon               | 节点的图标配置                                                                                                                                   | `{type:string;bgColor:string}`                                                                                                                                  |        |
| iconSvg            | 自定义节点图标组件，可支持图标的SVG形式，IMG形式，从全局 `widgets` 中导入组件                                                                                                                            | `string`                                                                                                                                                 |        |
| settingSchema      | 节点的业务配置信息，详见[form-render 文档](/form-render/api-schema)。同时设置`settingSchema`和`settingWidget`只生效`settingWidget`               | <a target="_blank" href="https://github.com/alibaba/x-render/blob/e2feff8fdb3bef5537b92a2157dbbf40b9d4eb17/packages/form-render/src/type.ts#L32">SchemaBase</a> |        |
| settingWidget      | 自定义节点的业务配置组件，在弹窗中展示。同时设置`settingSchema`和`settingWidget`只生效`settingWidget`。定义之后需要在`widgets`中引入自定义组件。 | `string`                                                                                                                                                        |        |
| settingWidgetProps | 用于向`settingWidget`自定义组件中传递自定义参数                                                                                                  | `object`                                                                                                                                                        |        |
| nodeWidget         | 自定义节点的业务配置信息展示组件，在节点内部展示业务配置信息。定义之后需要在`widgets`中引入自定义组件。                                          | `string`                                                                                                                                                        |        |
| nodePanel          | 自定义节点的面板配置信息                                                                                                                         | [TNodePanel](#tnodepanel)                                                                                                                                       |        |
| switchExtra        | 条件节点属性配置                                                                                                                               | [TSwitchExtra](#tswitchextra)                                                                                                                                   |        |
| parallelExtra        | 并行节点属性配置                                                                                                                               | [TParallelExtra](#tparallelextra)                                                                                                                                   |        |
| showTestingBtn      |  是否展示节点的单点调试按钮                      | `boolean`                                                                                   | `false` |
| getSettingSchema | 动态获取节点的业务配置信息，返回值同settingSchema。同时设置`settingSchema`和`getSettingSchema`只生效`getSettingSchema` | `(nodeId: string, nodeType: string, nodeItem: TNodeItem, nodeData: any, form: ReturnType<typeof useForm>) => Promise<Schema>` |        |



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


## ItemInfo

| 属性     | 描述                             | 类型      | 默认值 |
| -------- | -------------------------------- | --------- | ------ |
| key | 节点菜单项的key | `string`  |        |
| nodeId | 节点ID | `string`  |        |
| sourceHandle | 连接头ID | `string`  |        |
