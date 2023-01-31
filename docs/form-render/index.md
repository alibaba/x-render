---
order: 1
title: 开始使用
toc: content
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

> 一站式中后台 **表单解决方案**

## 一、简介

FormRender 2.0 是下一代的 `React.js` 表单解决方案， 是一个 Schema 驱动的表单组件。只需要传入一个包含各种描述信息的 Schema，就能渲染出一个完整的表单。



<!-- <Alert>
  <span>FormRender 已升级到 v1.x 版本，并对外提供中后台开箱即用 XRender 表单 / 表格 / 图表方案，如需使用老版本(v0.x)，请点击右上角 <a href="http://x-components.gitee.io/form-render/" target="_blank_"> 旧文档 </a>。</span>
</Alert> -->

## 二、安装

FormRender 依赖 ant design，单独使用不要忘记同时安装 [antd](https://ant-design.antgroup.com/docs/react/introduce-cn)。

```shell
npm i form-render --save
```
## 三、使用方式
### 函数组件
使用 `useForm` hooks 创建 form 实例。
```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  properties: {
    activityApplyInfo: {
      properties: {
        isBrandActivity: {
          enum: [
            true,
            false,
          ],
          enumNames: [
            '是',
            '否',
          ],
          props: {

          },
          title: '是否品牌活动',
          type: 'boolean',
          required: true,
          widget: 'radio',
        },
        brand: {
          props: {
            searchOptions: {
              onlyIntimeBrand: true, // 仅查询银泰
            },
          },
          title: '品牌名称',
          type: 'object',
          widget: 'brandSelect',
          required: '{{formData.activityApplyInfo.isBrandActivity}}',
        },
        exchangeType: {
          enum: [
            'SHOPPING_COUPON',
            'STORE_RIGHT',
            'BRAND_RIGHT',
            'POINT_CASH',
          ],
          enumNames: [
            '积分兑换购物券',
            '积分兑换门店权益',
            '积分兑换品牌权益',
            '积分加钱购',
          ],
          props: {},
          title: '兑换类型',
          required: true,
          type: 'string',
          widget: 'select',
        },
        exchangeSubType: {
          enum: [
            'BRAND_COUPON',
            'NORMAL_COUPON',
            'FULL_REDUCE',
            'NORMAL_PARKING',
          ],
          enumNames: [
            '品牌券',
            '银泰券',
            '满减券',
            '停车券',
          ],
          props: {},
          title: '业务细分',
          dependencies: ['exchangeType'],
          type: 'string',
          required: true,
          widget: 'select',
        },
        applyDesc: {
          props: {
          },
          title: '提报说明',
          required: true,
          type: 'string',
          max: 100,
          format: 'textarea',
        },
        salePrice: {
          props: {
            suffix: '元',
          },
          rules: [
            {
              pattern: '^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{1,2})?$',
              message: '请输入市场价,正数且最多保留两位小数',
            },
          ],
          maxLength: 10,
          title: '市场价',
          required: true,
          type: 'string',
        },
        isFreeInOtherChannel: {
          enum: [
            true,
            false,
          ],
          enumNames: [
            '是',
            '否',
          ],
          props: {

          },
          title: '是否其他渠道免费派发',
          type: 'boolean',
          required: true,
          widget: 'radio',
        },
      },
      props: {

      },
      collapsed: false,
      title: '活动提报信息',
      type: 'object',
    },
    activityBasicInfo: {
      properties: {
        title: {
          props: {

          },
          title: '活动标题',
          required: true,
          max: 20,
          type: 'string',
        },
        startTime: {
          format: 'dateTime',
          props: {

          },
          title: '活动开始时间',
          required: true,
          type: 'string',
        },
        endTime: {
          format: 'dateTime',
          props: {},
          title: '活动结束时间',
          required: true,
          type: 'string',
        },
        storeScopes: {
          props: {
            hasGroup: true,
          },
          title: '参与门店',
          type: 'array',
          required: true,
          widget: 'storeScopeSelect',
        },
        activityScopes: {
          enum: [
            'online',
            'offline',
          ],
          enumNames: [
            '线上活动',
            '线下活动',
          ],
          props: {

          },
          title: '活动范围',
          type: 'array',
          required: true,
          widget: 'checkboxes',
        },
        stockType: {
          enum: [
            'DAILY',
            'TOTAL',
            'UNLIMITED',
          ],
          enumNames: [
            '每日库存',
            '总库存',
            '不限量',
          ],
          props: {

          },
          title: '库存类型',
          required: true,
          type: 'string',
          widget: 'radio',
        },
        totalStock: {
          props: {
            precision: 0,
            min: 1,
            max: 9999999,
          },
          title: '库存数量',
          min: 1,
          max: 9999999,
          required: true,
          type: 'number',
          hidden: '{{formData.activityBasicInfo.stockType === "UNLIMITED"}}',
        },
        userLimitType: {
          enum: [
            'TOTAL',
            'UNLIMITED',
          ],
          enumNames: [
            '单账号活动期间限领',
            '不限量',
          ],
          props: {

          },
          title: '限领类型',
          required: true,
          type: 'string',
          widget: 'radio',
        },
        limitUpper: {
          props: {
            precision: 0,
            min: 1,
            max: 9999999,
          },
          title: '限领数量',
          min: 1,
          max: 9999999,
          required: true,
          type: 'number',
          hidden: '{{formData.activityBasicInfo.userLimitType === "UNLIMITED"}}',
        },
        userIdentity: {
          enum: [
            'member',
            'member365',
          ],
          enumNames: [
            '全部可领',
            '仅365会员',
          ],
          props: {

          },
          title: '可领用户类型',
          required: true,
          type: 'string',
          widget: 'radio',
        },
        employeeLimitIdentities: {
          enum: [
            'employee',
            'guider',
          ],
          enumNames: [
            '银泰员工',
            '导购员',
          ],
          props: {

          },
          default: [],
          title: '限领员工类型',
          type: 'array',
          widget: 'checkboxes',
        },
        merchantMemberBrand: {
          props: {
            pureSelect: true,
            placeholder: '选择后仅入会品牌会员可领',
          },
          title: '品牌会员',
          description: '选择后仅入会品牌会员可领',
          type: 'object',
          widget: 'merchantMemberBrand',
        },
        userGroup: {
          props: {

          },
          title: '宙斯人群',
          type: 'object',
          widget: 'zeusCrowdSelect',
        },
        riskCode: {
          props: {

          },
          title: '活动风控码',
          type: 'string',
        },
      },
      props: {

      },
      title: '基础信息',
      type: 'object',
    },
    activityReleaseRuleInfo: {
      properties: {
        releaseChannels: {
          props: {

          },
          title: '投放渠道',
          defaut: 'PMALL',
          required: true,
          type: 'array',
          widget: 'distributionChannelSelect',
        },
        activityTags: {
          props: {},
          title: '活动标签',
          required: true,
          type: 'array',
          widget: 'activitySelectTags',
        },
        isShowStore: {
          enum: [
            true,
            false,
          ],
          enumNames: [
            '是',
            '否',
          ],
          props: {

          },
          title: '是否展示门店',
          required: true,
          type: 'boolean',
          widget: 'radio',
        },
      },
      props: {

      },
      title: '投放规则',
      type: 'object',
    },
    activityRuleInfo: {
      properties: {
        activityHeadImageUrls: {
          props: {
            token: 'v1-f1dWFA8-ae983dd16',
            maxCount: 1,
            limit: 1,
            width: 480,
            height: 480,
            tips: '活动头图480*480',
          },
          title: '活动头图',
          required: true,
          type: 'array',
          widget: 'mosUpload',
        },
        activityDetailImageUrls: {
          props: {
            token: 'v1-f1dWFA8-ae983dd16',
          },
          title: '活动详情图',
          type: 'array',
          widget: 'mosUpload',
        },
        activityRuleDesc: {
          props: {},
          title: '规则介绍',
          required: true,
          type: 'string',
          format: 'textarea',
        },
        isShowSalePrice: {
          enum: [
            true,
            false,
          ],
          enumNames: [
            '是',
            '否',
          ],
          props: {

          },
          title: '是否展示市场价',
          required: true,
          type: 'boolean',
          widget: 'radio',
        },
        isSupportShare: {
          enum: [
            true,
            false,
          ],
          enumNames: [
            '是',
            '否',
          ],
          props: {

          },
          title: '是否可分享',
          required: true,
          type: 'boolean',
          widget: 'radio',
        },
        activityJumpUrl: {
          props: {

          },
          title: '去使用跳转链接',
          type: 'string',
        },
        pointType: {
          enum: [
            'INTIME_POINT',
          ],
          enumNames: [
            '银泰积分',
          ],
          props: {

          },
          title: '积分类型',
          required: true,
          type: 'string',
          widget: 'select',
        },
        activityType: {
          enum: [
            'POINT_CASH',
            'POINT_EXCHANGE',
          ],
          enumNames: [
            '积分加钱购',
            '积分兑换',
          ],
          props: {
            value: '{{formData.activityApplyInfo.exchangeType === "POINT_CASH" ? "POINT_CASH" : "POINT_EXCHANGE"}}',
          },
          title: '活动类型',
          readOnly: true,
          type: 'string',
          widget: 'select',
        },
        costPointNumber: {
          props: {
            precision: 0,
            min: 0,
            max: 9999999,
          },
          min: 1,
          max: 9999999,
          title: '消耗积分数',
          required: true,
          type: 'number',
          hidden: '{{formData.activityApplyInfo.exchangeType === "POINT_CASH"}}',
        },
      },
      props: {

      },
      title: '活动规则',
      type: 'object',
    },
    rightsEntities: {
      props: {

      },
      title: '权益列表',
      type: 'array',
      widget: '{{formData.activityApplyInfo.exchangeType === "POINT_CASH" ? "exchangeGoodsRightsTable" : "exchangeRightsTable"}}',
    },
  },
  props: {},
  type: 'object',
  labelWidth: 130,
  displayType: 'row',
}

export default () => {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData:', formData);
  };

  const watch = {
    "#": (a,b) => {
     
    },
    "activityApplyInfo.exchangeType": (a, b) => {
     
    }
  }

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} watch={watch} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
}
```
### 类组件
对于使用类组件的同学，可以使用 `connectForm` 替代 `useForm` hooks。

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { connectForm } from 'form-render';
// import 'antd/dist/antd.css';    如果项目没有对antd、less做任何配置的话，需要加上

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    select1: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
    },
  },
};

class Demo extends React.Component {
  onFinish = (formData) => {
    console.log('formData:', formData);
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <FormRender form={form} schema={schema} onFinish={this.onFinish} />
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </div>
    );
  }
}

export default connectForm(Demo);
```
## 四、速写 Schema

对于初学者来说记住 schema 所有的字段和使用方式并非易事。为了让大家能够快速上手，建议以以下的顺序尝试。

1. 去 [Playground](/playground) 逛逛，那里有从基础玩法、高级功能到完整样例的所有 schema 样例。
2. 玩转一下 [表单设计器](https://xrender.fun/generator)，拖拖拽拽导出 schema，丢到代码里生成可用表单。本质上这是一个可视化的表单生成器，支持 schema 的导入 & 导出。

   <div>
      <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="500px"/>
     <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='500px' />
   </div>

3. 详细的 schema 规范见 schema 的 [文档](/form-render/schema)。同时在 vscode 上搜索 `formrender` 可以找到 snippets 插件，手熟起来一整页表单的 schema 弹指间完成。


## 五、高级用法

- [如何写表单间的简单联动关系？](/form-render/advanced/linkage#一简单联动)
- [如何通过监听实现复杂联动？](/form-render/advanced/linkage#二watch-复杂联动)
- [如何用自定义组件完成定制元素的展示？](/form-render/advanced/widget)
- [如何写一个完整的服务端数据表单加载和提交？](/form-render/advanced/form-methods)

- [其他常见问题 FAQ](/form-render/faq)