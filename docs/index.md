---
title: Form Render
hero:
  title: X-Render
  desc: 通过 JSON Schema 生成标准 Form，常用于自定义搭建配置界面生成
  actions:
    - text: playground
      link: /playground
    - text: 开始使用
      link: /form-render/guide/getting-started
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: form-render
    desc: 像写一个input一样写表单
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: table-render/card-render
    desc: 协议生成 & 高度灵活的搜索列表
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: chart-render
    desc: 傻瓜式的图表绘制库
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

## 开始使用

[开始使用 form-render](/form-render/guide/getting-started)
[开始使用 table-render](/table-render/guide/getting-started)
[开始使用 card-render](/card-render/guide/getting-started)
[开始使用 chart-render](/chart-render/guide/getting-started)

## 使用 form-render

```jsx
import React, { useState } from 'react';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
    },
    select: {
      title: '单选',
      type: 'number',
      enum: [1, 2, 3],
      enumNames: ['选项1', '选项2', '选项3'],
    },
  },
};

const Demo = () => {
  const [formData, setFormData] = useState({});
  const onSubmit = () => {
    alert(JSON.stringify(formData));
  };
  return (
    <div>
      <FormRender schema={schema} formData={formData} onChange={setFormData} />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
};

export default Demo;
```

注：由于 fusion 的 css 无法按需引入，且在内部整个引入会造成样式覆盖，所以需要用户外部独立引入

### schema 可以不用手写哦！

使用 [表单设计器](https://x-render.gitee.io/schema-generator/)，拖拖拽拽导出 schema，丢到代码里生成可用表单

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="750px"/>

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='750px' />

还可在 vscode 商店搜索 “formrender” 下载配套 [可视化插件](https://marketplace.visualstudio.com/items?itemName=F-loat.vscode-plugin-fr-schema)

<img src="https://img.alicdn.com/tfs/TB1b53cmGNj0u4jSZFyXXXgMVXa-2740-1748.gif" alt="schema编辑器" width='750px' />

## 使用 table-render

```jsx
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import request from 'umi-request';

// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const schema = {
  type: 'object',
  properties: {
    string: {
      title: '标题',
      type: 'string',
      pattern: '^[A-Za-z0-9]+$',
      message: {
        pattern: '格式不对哦~',
      },
      'ui:width': '25%',
    },
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
    sorter: (a, b) => {},
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

const Demo = () => {
  return (
    <div style={{ background: 'rgb(245,245,245)' }}>
      <Search schema={schema} />
      <ProTable
        headerTitle="最简表格"
        columns={columns}
        rowKey="id"
        onChange={(one, two, sorter) => {
          const { setTable, tableState } = tableRef.current;
          setTable({
            search: {
              ...tableState,
              sortType: sorter.order,
            },
          });
        }}
      />
    </div>
  );
};

const Wrapper = () => {
  const searchApi = params => {
    return request
      .get(
        'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/simple',
        { params }
      )
      .then(res => {
        console.log('response:', res);
        if (res && res.data) {
          return { rows: res.data, total: res.data.length }; // 注意一定要返回 rows 和 total
        }
      })
      .catch(e => console.log('Oops, error', e));
  };
  return (
    <TableContainer searchApi={searchApi}>
      <Demo />
    </TableContainer>
  );
};

export default Wrapper;
```

## 使用 chart-render

```jsx
import React from 'react';
import { Area } from 'chart-render';

export default () => (
  <Area
    meta={[
      { id: 'ds', name: '日期', isDim: true },
      { id: 'page', name: '页面名称', isDim: true },
      { id: 'uv', name: '访客数' },
    ]}
    data={[
      { ds: '2020-12-31', page: '登录页', uv: 20 },
      { ds: '2020-12-31', page: '首页', uv: 120 },
      { ds: '2021-01-01', page: '登录页', uv: 21 },
      { ds: '2021-01-01', page: '首页', uv: 121 },
      { ds: '2021-01-02', page: '登录页', uv: 15 },
      { ds: '2021-01-02', page: '首页', uv: 115 },
      { ds: '2021-01-03', page: '登录页', uv: 40 },
      { ds: '2021-01-03', page: '首页', uv: 140 },
      { ds: '2021-01-04', page: '登录页', uv: 31 },
      { ds: '2021-01-04', page: '首页', uv: 131 },
      { ds: '2021-01-05', page: '登录页', uv: 32 },
      { ds: '2021-01-05', page: '首页', uv: 132 },
      { ds: '2021-01-06', page: '登录页', uv: 30 },
      { ds: '2021-01-06', page: '首页', uv: 130 },
    ]}
  />
);
```

## 贡献

想贡献代码、解 BUG 或者提高文档可读性？非常欢迎一起参与进来，在提交 MR 前阅读一下 [Contributing Guide](https://github.com/alibaba/form-render/blob/master/CONTRIBUTING.md)

感谢给 FormRender 贡献代码的你们，以及 JetBrains 提供 Free 使用！

<a href="https://github.com/alibaba/form-render/graphs/contributors"><img src="https://opencollective.com/form-render/contributors.svg?width=890&button=false"/></a><a href="https://www.jetbrains.com/?from=form-render"><img src="https://img.alicdn.com/tfs/TB1gPDDJKL2gK0jSZFmXXc7iXXa-2000-2168.png" width="100px" /></a>

## 反馈与共建

1. 欢迎 issue、pr 和点赞哦 [github](https://github.com/alibaba/form-render)

2. 文档建议至少读一下 “开始使用”，有疑问、建议和讨论诉求的，请加入 FR 官方群：

<img src="https://img.alicdn.com/tfs/TB1CprJg5pE_u4jSZKbXXbCUVXa-894-1087.jpg" width="300px" />
