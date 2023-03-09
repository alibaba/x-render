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
中后台列表解决方案，常用于搜索列表快速生成

## 简介

* **真正开箱即用**：以最简单的方式配置 API请求和表头字段，就能生成一个好用的搜索列表。
* **XRender 生态**：搜索能力集成 FormRender，以最小成本快速生成搜索面板。
* **无缝习惯使用**：表格能用 Ant Design Table 来提供，降低用户使用成本。

## 安装

```sh
npm i table-render --save
```

## 最简 Demo

```jsx
/**
 * transform: true
 * defaultShowCode: false
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
  labelWidth: 80,
  properties: {
    title: {
      title: '标题',
      type: 'string'
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      hidden: "{{formData.title === '111'}}",
    },
    title1: {
      title: '标题',
      type: 'string'
    },
    created_at1: {
      title: '创建时间',
      type: 'string',
      format: 'date',
    },
    title2: {
      title: '标题',
      type: 'string'
    },
    created_at2: {
      title: '创建时间',
      type: 'string',
      format: 'date',
    },
    title3: {
      title: '标题',
      type: 'string'
    },
    created_at3: {
      title: '创建时间',
      type: 'range',
      format: 'date',
      cellSpan: 2
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
      total: dataSource.length,
    };
  };

  return (
    <TableRender
      search={{ schema }}
      request={api}
      columns={columns}
      title="最简表格"
      toolbarAction={true}
      toolbarRender={ 
        <>
          <Button>
            查看日志
          </Button>
          <Button>
            导出数据
          </Button>
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

