import { Button, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import React, { forwardRef, useImperativeHandle } from 'react';

export interface AdvancedSettingWidgetProps {
  value: any;
  onChange: (value: any) => void;
  readOnly?: boolean;
}

export interface AdvancedSettingWidgetRef {
  validateForm: () => Promise<boolean>;
}

export const AdvancedSettingWidget = forwardRef<
  AdvancedSettingWidgetRef,
  AdvancedSettingWidgetProps
>(({ value, onChange, readOnly }, ref) => {
  const form = useForm();

  // 暴露验证方法
  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      return await form
        .validateFields()
        .then(() => {
          return true;
        })
        .catch(err => {
          return false;
        });
    },
  }));

  const schema = {
    type: 'object',
    properties: {
      name: {
        title: '节点名称',
        type: 'string',
        required: true,
      },
      formType: {
        title: '配置类型',
        type: 'string',
        enum: ['simple', 'complex'],
        enumNames: ['简单配置', '复杂配置'],
        widget: 'radio',
        required: true,
      },
      simpleInput: {
        title: '简单输入',
        type: 'string',
        hidden: '{{formData.formType !== "simple"}}',
        required: true,
      },
      complexConfig: {
        title: '复杂配置',
        type: 'object',
        hidden: '{{formData.formType !== "complex"}}',
        properties: {
          field1: {
            title: '字段1',
            type: 'string',
          },
          field2: {
            title: '字段2',
            type: 'string',
            description: '字段1有值时才能输入',
            disabled: '{{!formData.complexConfig?.field1}}',
          },
        },
      },
      conditions: {
        title: '条件配置',
        type: 'array',
        widget: 'cardList',
        items: {
          type: 'object',
          properties: {
            name: {
              title: '条件名称',
              type: 'string',
              required: true,
            },
            operator: {
              title: '操作符',
              type: 'string',
              enum: ['equals', 'contains', 'greater', 'less'],
              enumNames: ['等于', '包含', '大于', '小于'],
              required: true,
            },
            value: {
              title: '条件值',
              type: 'string',
              required: true,
            },
          },
        },
      },
    },
  };

  // 监听表单变化
  const watch = {
    '#': formData => {
      onChange(formData);
    },
    name: val => {
      console.log('监听节点名称的变化', val);
    },
    'complexConfig.field1': value => {
      // 当field1变化时，如果为空则清空field2
      if (!value) {
        const values = form.getValues();
        form.setValues({
          ...values,
          complexConfig: {
            ...values.complexConfig,
            field2: '',
          },
        });
      }
    },
  };

  // 添加条件按钮
  const addCondition = () => {
    const values = form.getValues();
    const conditions = values.conditions || [];
    form.setValues({
      ...values,
      conditions: [
        ...conditions,
        {
          name: '',
          operator: 'equals',
          value: '',
        },
      ],
    });
  };

  React.useEffect(() => {
    if (value) {
      form.setValues(value);
    }
  }, [value]);

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        watch={watch}
        readOnly={readOnly}
      />
      {!readOnly && (
        <div style={{ marginTop: '16px' }}>
          <Space>
            <Button type="primary" onClick={addCondition}>
              添加条件
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
});
