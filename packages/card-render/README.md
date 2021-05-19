# Table Render - 中后台表格解决方案

[![npm version](https://badge.fury.io/js/table-render.svg)](https://www.npmjs.com/package/table-render) [![license](https://badgen.net/npm/license/table-render)](./LICENSE)

<!-- ## Stargazers over time

[![Stargazers over time](https://starchart.cc/form-render/table-render.svg)](https://starchart.cc/form-render/table-render) -->

## 简介

1. [文档地址](https://form-render.github.io/table-render/)
2. [更新日志](https://github.com/form-render/table-render/blob/master/CHANGELOG.md)

## 使用方法

table-render 目前默认使用 ant design，所以请在 antd 项目下使用，如果要单独使用，不要忘记安装 antd

```sh
npm i table-render antd
```

or

```sh
yarn add table-render antd
```

```js
import React from 'react';
import { Button } from 'antd';
import { ProTable, Search, TableContainer, useTable } from 'table-render';

// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const searchSchema = {
  type: 'object',
  properties: {
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      'ui:width': '25%',
    },
  },
};

// 配置完全透传antd table
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'state',
    enum: {
      open: '未解决',
      closed: '已解决',
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: row => (
      <a
        href="https://x-render.gitee.io/form-render/"
        target="_blank"
        rel="noopener noreferrer"
      >
        查看
      </a>
    ),
  },
];

const searchApi = params => {
  return {
    rows: [
      {
        id: 624748504,
        title: 'mock数据1',
        state: 'closed',
        created_at: '2020-05-26T09:42:56Z',
      },
      {
        id: 624691229,
        title: 'mock数据2',
        state: 'open',
        created_at: '2020-05-26T08:19:22Z',
      },
    ],
    total: 2,
  };
};

const Demo = () => {
  return (
    <TableContainer searchApi={searchApi}>
      <Search schema={searchSchema} />
      <ProTable
        headerTitle="高级表单"
        toolbarRender={() => [
          <Button key="1">查看日志</Button>,
          <Button key="2">导出数据</Button>,
          <Button key="3">创建</Button>,
        ]}
        // 下面全是antd的props
        columns={columns}
        rowKey="id"
      />
    </TableContainer>
  );
};

export default Demo;
```

![](https://img.alicdn.com/tfs/TB1Ma6itBBh1e4jSZFhXXcC9VXa-2172-516.png)
