/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi } from './advanced/utils';

const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const basic = {
    type: 'object',
    properties: {
      AllString: {
        title: 'string类',
        type: 'object',
        properties: {
          input: {
            title: '简单输入框',
            type: 'string',
            placeholder: '昵称',
          },
          textarea: {
            title: '简单文本编辑框',
            type: 'string',
            format: 'textarea',
          },
          color: {
            title: '颜色选择',
            type: 'string',
            format: 'color',
          },
          image: {
            title: '图片展示',
            type: 'string',
            format: 'image',
            default: 'http://placekitten.com/200/300',
          },
          uploader: {
            title: '上传文件',
            type: 'string',
            format: 'upload',
            props: {
              action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            },
          },
          treeSelect: {
            title: '树形选择',
            type: 'string',
            widget: 'treeSelect',
            props: {
              treeDefaultExpandAll: true,
              treeData: [
                {
                  title: 'Node1',
                  value: '0-0',
                  key: '0-0',
                  children: [
                    {
                      title: 'Child Node1',
                      value: '0-0-1',
                      key: '0-0-1',
                    },
                    {
                      title: 'Child Node2',
                      value: '0-0-2',
                      key: '0-0-2',
                    },
                  ],
                },
                {
                  title: 'Node2',
                  value: '0-1',
                  key: '0-1',
                },
              ],
            },
          },
        },
      },
      allDate: {
        title: '时间类',
        type: 'object',
        properties: {
          date: {
            title: '日期选择',
            type: 'string',
            format: 'date',
          },
          dateTime: {
            title: '日期时间选择',
            type: 'string',
            format: 'dateTime',
          },
          time: {
            title: '时间选择',
            type: 'string',
            format: 'time',
          },
          dateRange: {
            title: '日期范围',
            type: 'range',
            format: 'dateTime',
            placeholder: ['开始时间', '结束时间'],
          },
          timeRange: {
            title: '时间范围',
            type: 'range',
            format: 'time',
          },
          year: {
            title: '年份选择',
            type: 'string',
            format: 'year',
          },
          month: {
            title: '月份选择',
            type: 'string',
            format: 'month',
          },
          week: {
            title: '周选择',
            type: 'string',
            format: 'week',
          },
          quarter: {
            title: '季度选择',
            type: 'string',
            format: 'quarter',
          },
        },
      },
      allNumber: {
        title: 'number类',
        type: 'object',
        properties: {
          number1: {
            title: '数字输入框',
            description: '1 - 1000',
            type: 'number',
            min: 1,
            max: 1000,
          },
          number2: {
            title: '带滑动条',
            type: 'number',
            widget: 'slider',
          },
          rate: {
            title: '评价',
            type: 'number',
            widget: 'rate',
          },
        },
      },
      allBoolean: {
        title: 'boolean类',
        type: 'object',
        properties: {
          radio: {
            title: '是否通过',
            type: 'boolean',
          },
          switch: {
            title: '开关控制',
            type: 'boolean',
            widget: 'switch',
          },
        },
      },
      allEnum: {
        title: '选择类',
        type: 'object',
        properties: {
          select: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            default: 'a',
            widget: 'select',
          },
          radio: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'radio',
          },
          multiSelect: {
            title: '多选',
            description: '下拉多选',
            type: 'array',
            items: {
              type: 'string',
            },
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['杭州', '武汉', '湖州', '贵阳'],
            widget: 'multiSelect',
          },
          boxes: {
            title: '多选',
            description: 'checkbox',
            type: 'array',
            items: {
              type: 'string',
            },
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['杭州', '武汉', '湖州', '贵阳'],
            widget: 'checkboxes',
          },
          cascade: {
            title: '级联选择',
            type: 'array',
            widget: 'cascader',
            props: {
              options: [
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'xihu',
                          label: 'West Lake',
                        },
                      ],
                    },
                  ],
                },
                {
                  value: 'jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'zhonghuamen',
                          label: 'Zhong Hua Men',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      listName2: {
        title: '对象数组',
        description: '对象数组嵌套功能',
        type: 'array',
        min: 1,
        max: 3,
        items: {
          type: 'object',
          properties: {
            input1: {
              title: '简单输入框',
              type: 'string',
            },
            select1: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    setSchema(basic);
  }, []);

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
  };

  const toggle = () => {
    setCollapsed(o => !o);
  };

  return (
    <div>
      <Button onClick={toggle}>对象全折叠</Button>
      <FormRender
        form={form}
        schema={schema}
        allCollapsed={collapsed}
        onFinish={onFinish}
      />
      <Space>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
