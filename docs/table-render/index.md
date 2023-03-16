---
order: 0
title: '使用教程'
group: 
  order: 1
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">TableRender</span>
</div>

<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/table-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/table-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/table-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/table-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/table-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/table-render.svg?style=flat-square">
  </a>
  <a href="https://github.com/alibaba/x-render" >
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>
中后台列表开箱即用解决方案，常用于搜索列表快速生成

## 简介

* **开箱即用**：以最简单的方式配置 API 请求和表头字段，就能生成一个好用的搜索列表。
* **XRender 生态**：搜索部分集成 FormRender，以最小成本快速生成搜索面板。
* **无缝对接**：表格部分沿用 Ant Design Table， API 无缝对接，降低用户使用成本。
* **数据模版**：表格列内置多种数据展示模版，减少自定义 Render 函数配置。
* **多种形态**：支持搜索栏、工具栏、表格内容，根据业务需求相互组合展示多种形态。

## 安装

table-render 依赖 ant design，单独使用不要忘记安装～
```sh
npm i table-render --save
```

## 最简 Demo

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import TableRender from 'table-render';
import { Button } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

const dataSource = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    id: i.toString(),
    title: `标题${i + 1}`,
    created_at: new Date().getTime(),
  });
}

const schema = {
  type: 'object',
  labelWidth: 70,
  properties: {
    title: {
      title: '标题',
      type: 'string'
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date'
    }
  }
};

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: (row, record) => <a onClick={() => alert(row.title)}>编辑</a>,
  }
];

const Demo = () => {
  
  const api = () => {
    return {
      data: dataSource,
      total: dataSource.length
    };
  };

  return (
    <TableRender
      search={{ schema }}
      request={api}
      columns={columns}
      title='最简表格'
      toolbarRender={ 
        <>
          <Button>查看日志</Button>
          <Button>导出数据</Button>
          <Button type='primary'>
            <PlusOutlined />
            新增
          </Button>
        </>
      }
    />
  );
}

export default Demo;
```

