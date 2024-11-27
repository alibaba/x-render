---
order: 1
toc: content
title: API
---
# API

## XFlow

<!-- 对 Antd Table 的 [props](https://ant-design.antgroup.com/components/table-cn/#Table) 完全兼容，但 `dataSource`, `loading` 这两个参数是内部状态，不允许配置 -->

| 属性          | 描述                                 | 类型                                                      | 默认值 |
| ------------- | ------------------------------------ | --------------------------------------------------------- | ------ |
| initialValues | 初始的节点和边数据                   | `{nodes:any[],edges:any}`                                 | -      | - |
| layout        | 节点布局的方向                       | `LR \| TB`                                                | -      | - |
| widges        | 自定义组件                           | `Record<string, ReactNode>`                               | -      | - |
| settings      | 节点配置，定义页面中可拖动的节点配置 | ( [TNodeGroup](#tnodegroup) \| [TNodeItem](#tnodeitem))[] |        |
| nodeSelector  | 节点选择器配置，可控制节点的可搜索性 | `TNodeSelector`                                           |        |

### TNodeGroup

节点分组配置

| 属性  | 描述         | 类型          | 默认值 |
| ----- | ------------ | ------------- | ------ |
| title | 分组名称     | `string`      |        |
| type  | 分组类型     | `_group`      |        |
| items | 节点配置信息 | `TNodeItem[]` |        |

## TNodeItem

单个节点配置

| 属性               | 描述                                                                | 类型                                                                                                                                                            | 默认值 |
| ------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| title              | 节点名称                                                            | `string`                                                                                                                                                        |        |
| type               | 节点类型,内置节点:  `Start\|End`                                    | `string`                                                                                                                                                        |        |
| hidden             | 是否在配置面板中显示节点                                            | `boolean`                                                                                                                                                       | false  |
| targetHandleHidden | 是否隐藏左侧输入连接头                                              | `boolean`                                                                                                                                                       | false  |
| sourceHandleHidden | 是否隐藏右侧输出连接头                                              | `boolean`                                                                                                                                                       | false  |
| hideDesc           | 是否隐藏节点下方的描述信息                                          | `boolean`                                                                                                                                                       | false  |
| icon               | 节点的图标配置                                                      | `{type:string;bgColor:string}`                                                                                                                                  |        |
| schema             | 节点的业务配置信息，详见[form-render 文档](/form-render/api-schema) | <a target="_blank" href="https://github.com/alibaba/x-render/blob/e2feff8fdb3bef5537b92a2157dbbf40b9d4eb17/packages/form-render/src/type.ts#L32">SchemaBase</a> |        |
| settingWidget      | 自定义节点的业务配置组件                                            | `string`                                                                                                                                                        |        |

## TNodeSelector

| 属性       | 描述             | 类型                                                      | 默认值 |
| ---------- | ---------------- | --------------------------------------------------------- | ------ |
| showSearch | 节点是否可被搜索 | `boolean`                                                 | false  |
| items      | 节点配置         | ( [TNodeGroup](#tnodegroup) \| [TNodeItem](#tnodeitem))[] |        |
