<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">XFlow</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/@xrenders/xflow" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@xrenders/xflow.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/xflow" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@xrenders/xflow.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/@xrenders/xflow" target="_blank">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/@xrenders/xflow.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

画布流程编排解决方案

## 安装

```bash
npm install @xrenders/xflow
```

## 基础使用

### 1. 引入组件

```js
import XFlow from '@xrenders/xflow';
```

### 2. 配置节点菜单以及节点面板

```js
 const nodeSettings = [
    {
      title: '开始',
      type: 'Start',
      hidden: true,
      targetHandleHidden: true,
      icon: {
        type: 'icon-start',
        bgColor: '#17B26A',
      },
      settingSchema: {
        type: 'object',
        properties: {
          input: {
            title: '变量一',
            type: 'string',
            widget: 'input',
          },
        },
      },
    },
    {
      title: '结束',
      type: 'End',
      hidden: true,
      sourceHandleHidden: true,
      icon: {
        type: 'icon-end',
        bgColor: '#F79009',
      },
      settingSchema: {
        type: "object",
        properties: {
          input: {
            title: '变量一',
            type: 'string',
            widget: 'input',
          },
        }
      }
    },
    {
      title: 'LLM',
      type: 'LLM',
      desc: '调用大语言模型回答问题或者对自然语言进行处理',
      icon: {
        type: 'icon-model',
        bgColor: '#6172F3',
      },
      settingSchema: {
        type: 'object',
        properties: {
          model: {
            title: '模型',
            type: 'string',
            enum: ['gpt-3.5', 'gpt-4'],
            default: 'gpt-3.5'
          },
          temperature: {
            title: '温度',
            type: 'number',
            default: 0.7,
            minimum: 0,
            maximum: 1
          }
        }
      }
    },
    {
      title: 'Prompt',
      type: 'Prompt',
      description: '通过精心设计提示词，提升大语言模型回答效果',
      icon: {
        type: 'icon-prompt',
        bgColor: '#17B26A',
      },
    },
    {
      title: '知识库',
      type: 'knowledge',
      description: '允许你从知识库中查询与用户问题相关的文本内容',
      icon: {
        type: 'icon-knowledge',
        bgColor: '#6172F3',
      },
    },
  ];
```


### 3. 使用组件

```js
const Demo = () => {
  return (
    <XFlow
      settings={nodeSettings}
      initialValues={{
        nodes: [],
        edges: []
      }}
    />
  );
};
```

## 完整示例

<code src="./demo/quickStart/index.tsx"></code>

## 注意事项
1. 确保项目中已安装必要的依赖：
   - React
   - XFlow
2. 组件需要设置固定高度，建议使用百分比或视口单位
3. 节点配置中的 `settingSchema` 需要符合 FormRender 的协议规范
4. 初始值 `initialValues` 中的节点数据需要包含必要的字段：id、type、data、position
