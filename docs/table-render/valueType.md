---
order: 5
title: '数据展示模版'
group: 
  title: 最佳展示
  order: 0
---

# 数据展示类型
数据模版：`image`、`money`、`tag`、`tags`、`progress`、`date`、`dateTime`、`dateRange`、`dateTimeRange`，通过配置 `valueType`
列值转换：通过配置 `enum`
列头气泡提示：通过配置 `tooltip`
复制：通过配置 `copyable`
省略：通过配置 `ellipsis`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */

import React, { useRef } from 'react';
import TableRender, { } from 'table-render';
import { schema } from './static/search';
import { toolbarRender } from './static/table';

const Demo = () => {
  const tableRef: any = useRef();

  const columns = [
    {
      title: '图片',
      dataIndex: 'imgSrc',
      valueType: 'image',
      // valueTypeProps: { 配置图片大小 antd iamge props

      // }
    },
    {
      title: '复制、省略',
      dataIndex: 'address',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
      width: '120px',
    },
    {
      title: '标题气泡',
      tooltip: { title: '气泡提示'},
      enum: {
        open: '营业中',
        closed: '已打烊',
      },
      dataIndex: 'state',
      width: '120px',
    },
    {
      title: '金额',
      sorter: true,
      dataIndex: 'money',
      valueType: 'money',
    },
    {
      title: '标签',
      dataIndex: 'tagText',
      valueType: 'tag',
      valueTypeProps: (value: any, record: any) => ({
        color: value === '1' ? 'red' :  'blue'
      }),
      enum: {
        1: '失败'
      }
    },
    {
      title: '多标签',
      dataIndex: 'tags', 
      valueType: 'tags',
      width: 160,
      valueTypeProps: (value) => { // [ { name : '', color: '' }] => 命中默认格式无需配置
        return {
          name: value?.text,
          color: 'cyan'
        }
      },
    },
    {
      title: '进度条',
      dataIndex: 'progressNum',
      valueType: 'progress',
      // valueTypeProps: (value, record) => ({
      //   status: 'exception'
      // })
      width: '140px',
    },
    {
      title: '枚举转换',
      dataIndex: 'status',
      valueType: 'text',
      enum: {
        success: '成功',
        default: '失败' // 默认值
      }
    },
    {
      title: '时间-切换格式',
      dataIndex: 'created_at',
      width: '140px',

      valueType: 'date',
      valueTypeProps: {
        format: 'YYYY/MM/DD' // 默认是 'YYYY-MM-DD'
      }
    },
    {
      title: '时间区间',
      width: '220px',

      dataIndex: 'dateRange', // 默认值 [start, end]
      valueType: 'dateRange'
    },
    {
      title: '时间区间（两个字段）',
      width: '220px',

      valueType: 'dateRange', 
      valueTypeProps: {
        bind: ['stateDate', 'endDate'] // 时间聚合成数组 [start, end]
      }
    }
  ];

  const searchApi = () => {
    const list = [{
      id: 1,
      address: '余杭区聚橙路和文昌路交叉口',
      status: 'success',
      money: 9999999,
      imgSrc: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      created_at: '2020-05-26T09:42:56Z',
      progressNum: '10',
      tagText: '1',
      tags: [
        {
          text: '三星1',
          color: 'cyan'
        },
        {
          text: '三星2',
          color: 'cyan'
        }
      ],
      state: 'open',
      dateRange: ['2020-05-26T09:42:56Z', '2020-05-26T09:42:56Z'],
      timeRange: ['2020-05-26T09:42:56Z', '2020-05-26T09:42:56Z'],
      stateDate: '2020-05-26T09:42:56Z',
      endDate: '2020-05-26T09:42:56Z'
    }];

    return {
      data: list,
      total: list.length
    };
  };

  return (
    <TableRender 
      ref={tableRef}
      search={{ schema }}
      request={searchApi}
      columns={columns}
      toolbarRender={toolbarRender}
      scroll={{
        x: 1500
      }}
    />
  )
};

export default Demo;





```
