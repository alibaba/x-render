import React from 'react';
import { Button, Dialog, Space, Switch } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  properties: {
    city: {
      title: '城市',
      type: 'array',
      widget: 'cascader',
      props: {
        options: [
          { 
            label: '浙江', 
            value: 1, 
            children: [
              { label: '杭州', value: 2 }
            ]
          },
        ]
      }
    },
    group1: {
      title: '分组',
      type: 'object',
      widget: 'group',
      properties: {
        date: {
          title: '日期',
          type: 'string',
          widget: 'datePicker',
          props: {
            precision: 'month'
          }
        },
        input: {
          title: '输入框',
          type: 'string',
          widget: 'input',
          required: true,
          placeholder: '请输入'
        },
      }
    },
    group2: {
      title: '分组2',
      type: 'object',
      widget: 'group',
      properties: {
        textarea: {
          title: '长文本',
          type: 'string',
          widget: 'textArea',
          placeholder: '请输入'
        },
        slider: {
          title: '滑动条',
          type: 'string',
          widget: 'slider',
          props: {
            range: true,
          }
        },
      }
    },
    switch: {
      title: '开关',
      type: 'bool',
      widget: 'switch',
      props: {
        uncheckedText: '关',
        checkedText: '开'
      }
    },
    stepper: {
      title: '步进器',
      type: 'number',
      widget: 'stepper'
    },
    rate: {
      title: '评分',
      type: 'string',
      widget: 'rate'
    },
    selector: {
      title: '选择组',
      type: 'string',
      widget: 'selector',
      props: {
        multiple: true,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
          { label: 'D', value: 'd' },
          { label: 'E', value: 'e' },
          { label: 'F', value: 'f' }
        ]
      }
    },
    radio: {
      title: '单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};


export default () => {
  const form = useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [displayType, setDisplayType] = React.useState('column');

  const onFinish = (formData: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(formData, null, 2)}</pre>,
    })
  };

  return (
    <div>
      <Space style={{ margin: 12 }}>
        <div>只读: <Switch checked={readOnly} onChange={(val) => setReadOnly(val)} /></div>
        <div>禁用: <Switch checked={disabled} onChange={(val) => setDisabled(val)} /></div>
        <div>
          布局: 
          <Switch
            checkedText="列"
            uncheckedText="行"
            checked={displayType === 'column'}
            onChange={(val) => setDisplayType(val ? 'column': 'row')}
          />
        </div>
      </Space>
      <FormRender
        displayType={displayType}
        readOnly={readOnly}
        disabled={disabled}
        schema={schema}
        form={form}
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      />
    </div>
  );
}
