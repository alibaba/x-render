---
order: 7
title: '节点日志和节点状态'
mobile: false
group: 
  title: 高级用法
  order: 1
---
# 节点日志和节点状态


## 节点状态
 可配置不同状态下节点的边框颜色。通过`data._status`属性配置，比如：
 ```js
   const nodes=[
     {
      id: 'w4be9edh4bhdlokm',
      type: 'Start',
      position: {
        x: -379.21875,
        y: 348.75,
      },
      data: {
        _status: "success" // 状态配置，可自定义，可使用内置状态
      },
    },
   ]
 ```
 - **内置状态**: 内置`success|error|warning`三种状态,对应颜色如下:
  ```js
  [
    { value: 'success', color: '#52c41a',name: '成功'},
    { value: 'error',color: '#ff4d4f',name: '失败'},
    {value: 'warning',color: '#faad14',name: '告警'}
  ]
  ```
 - **自定义状态**:可通过`globalConfig.nodeView.status`自定义节点状态，同名可覆盖内置状态颜色。注意:`value`只能为`string`类型！
    ```js
      globalConfig={{
          nodeView: {
            status: [
              {
                value: 'custom-error',  // 状态标识
                color: 'red',   // 颜色值
                name: '自定义失败状态',  // 状态名称
              },
              {
                value: 'success',
                color: 'green',
                name: '自定义成功状态（覆盖内置成功状态）',
              },
            ],
          }
        }}
   ```

<code src="./demo/log/index.tsx"></code>


## 节点日志面板

点击有状态的节点，会出现两个面板，左边为节点配置面板，右边为节点日志面板。

日志面板全局配置参数如下：
```js
       <XFlow
        widgets={{ CustomLogPanel }}
        logPanel={{// 日志面板配置参数
          logList, // 日志面板数据
          loading, // 日志面板loading
          logWidget:'CustomLogPanel'// 自定义日志面板
        }}
```
### 内置节点日志面板

内置节点日志面板的数据来源于`logPanel.logList`,`logList`需要遵守以下数据格式,日志面板的追踪tab页默认只展示所有有状态的节点，即：`data._status`值存在的节点。
```js
 Array< {
  statusPanel?: {
    status?: Array<{ label: string; value?: string; isBadge?: boolean }>; // isBadge是否为badge形式显示状态
    extra?: string | ReactNode;
  };
  codePanel?: Array<{ title: string; code: string }>;
  nodeId: string;// 节点ID
}>; 
   
```
<code src="./demo/log/buildIn-log/index.tsx"></code>


### 自定义节点日志面板

自定义组件`logPanel?.logList`作为`logList`透传。

```js
const CustomLogPanel = ({ logList, node }) => {
  console.log('自定义组件', logList, node);
  return <p>自定义组件:{node?.id}</p>;
};

```

<code src="./demo/log/custom-log/index.tsx"></code>

