---
order: 0
toc: content
title: 开始使用
mobile: false
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">FormRender</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/form-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/form-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/form-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/form-render.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

中后台表单解决方案，通过 JsonSchema 协议渲染表单


```shell
npm i form-render --save
```
## 使用方式

**函数组件**

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import DataView from '@xrenders/data-view';
import { DataRender } from '@ali/data-view';

export default () => {
 
  const mockData = {
    hotelName: 'Hôtel Président Wilson',
    hotelId: '1232431231',
    basis: {
      orderId: '1836701282287044137',
      name: 'Lily',
      phone: '+86 13648901092',
      email: '48901092@gmail.com',
      guests: '8 Adults 2 Children',
      stayPeriod: '08 April 2022-12. April 2002',
      nights: '4 nights',
      roonName: 'Standard Double Room with sea view',
      rooms: '1 room',
      bookingTime: '08 April 2022, 12:09',
      nationality: 'China',
    },

    rateInfo: {
      ratePlan: 'Breakfast fro one',
      telePhone: '693.00',
      priceTag: '700.00',
      details: [
        {
          title: 'Net Rate(CNY)',
          price: '99.00',
          priceTag: '99.00',
        },
        {
          title: 'Tax Exclusive',
          price: '121.00',
          priceTag: '121.00',
        },
        {
          title: 'Tax & Fees',
          price: '21.00',
          priceTag: '21.00',
        },
        {
          title: 'Net Rate(CNY)',
          price: 'Breakfast for 1',
          priceTag: 'Breakfast for 1',
        },
      ],
      promotions: [
        { name: 'Early bird June 2022', price: '7.00', rate: '25%', desc: 'Every night' },
        { name: 'Early bird June 2022', price: '7.00', rate: '25%', desc: 'Every night' },
      ],
    },
    invoice: 'Please invoice the customer if requested The amount of invoice is CNY99.00',
    prePay: 'Prepay reservation. Guest has prepaid the room charge; please reserve the room.',
    covid:
      "Your hotel's COVID-19 prevention requirements will be listed on the booking details page when the user makes a booking at your hotel as well as in the booking confirmation SMS they will receive. ",
    policy: [
      {
        time: 'Before 24 June 2022 12:00',
        timeTag: 'London Time',
        type: '30% on first night',
      },
    ],
    orderTags: ['Sell in'],
    tags: ['prepay'],
  };

  const schema = [
    {
      dataKey: 'rateInfo',
      widget: 'FDescriptions',
      title: '描述列表',
      column: 3,
      items: [
        {
          label: '姓名',
          dataKey: 'userName',
          labelToolTip: {
            overlayInnerStyle: { width: '280px' },
            title: '1231231231231231大了就啊都是十分理解啊老地方见的失联飞机23123',
          },
        },
        {
          label: '手机号',
          dataKey: 'telePhone',
          children: {
            widget: 'FText',
            iconSetting: {
              type: 'icon-phone',
            },
          },
        },
        {
          label: '地址',
          dataKey: 'live',
          showLevel: 1,
        },
      ],
    },
  ];
  

  return (
    <DataView 
      schema={schema} 
      data={mockData} 
      sourceData={mockData}
    />
  );
}
```