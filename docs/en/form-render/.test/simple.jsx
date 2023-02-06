/**
 * transform: true
 * defaultShowCode: true
 */
import { Button, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = () => {
  const form = useForm();

  const schema = {
    type: 'object',
    labelWidth: 120,
    displayType: 'row',
    column: 1,
    properties: {
      airlineData: {
        title: '',
        description: '',
        type: 'object',
        properties: {
          airlineCode: {
            title: '航司',
            type: 'string',
            enum: ['6J', '7G', 'FR', 'MM', 'PC', 'RS', 'TW'],
            enumNames: [
              '天网航空',
              '星悦航空',
              'Ryanair',
              '乐桃航空',
              '飞马航空',
              '首尔航空',
              '德威航空',
            ],
            widget: 'select',
            description: '',
            required: true,
            placeholder: '选择航司',
            labelWidth: 0,
            displayType: 'column',
          },
          funcList: {
            title: '代理',
            description: '',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                bizType: {
                  title: '功能类型',
                  type: 'string',
                  enum: [
                    'Airline',
                    'Book',
                    'FlightShopping',
                    'FlightPrice',
                    'BookAndPayment',
                    'OrderDetail',
                    'CancelOrder',
                  ],
                  enumNames: [
                    '航线获取',
                    '机票预定',
                    '机票报价',
                    '机票询价',
                    '预定并支付',
                    '订单详情',
                    '关闭订单',
                  ],
                  widget: 'select',
                  required: true,
                  displayType: 'column',
                },
                groupConfigs: {
                  title: '代理分组',
                  description: '',
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      groupId: {
                        title: '代理',
                        type: 'string',
                        enum: ['a', 'b', 'c'],
                        enumNames: ['早', '中', '晚'],
                        widget: 'select',
                        required: true,
                        labelWidth: 55,
                        width: '30%',
                      },
                      flag: {
                        title: '标签',
                        type: 'string',
                        enum: ['a', 'b', 'c'],
                        enumNames: ['早', '中', '晚'],
                        widget: 'select',
                        labelWidth: 55,
                        width: '30%',
                      },
                      weight: {
                        title: '权重',
                        type: 'number',
                        default: 1,
                        labelWidth: 55,
                        width: '30%',
                      },
                    },
                  },
                  required: true,
                  props: {
                    foldable: true,
                  },
                  displayType: 'row',
                },
                url: {
                  title: '测试链接',
                  type: 'string',
                  required: true,
                  props: {},
                  pattern: '',
                  displayType: 'column',
                },
                method: {
                  title: '请求类型',
                  type: 'string',
                  enum: ['GET', 'POST'],
                  enumNames: ['GET', 'POST'],
                  widget: 'select',
                  default: 'GET',
                  required: true,
                  displayType: 'column',
                },
                headers: {
                  title: '请求头',
                  type: 'string',
                  format: 'textarea',
                  placeholder: '请输入json格式的请求头信息',
                  props: {},
                  displayType: 'column',
                },
              },
            },
            required: true,
            props: {
              foldable: true,
            },
          },
        },
      },
    },
  };

  const onFinish = (data, errors) => {
    console.log(data, errors);
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Space>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
