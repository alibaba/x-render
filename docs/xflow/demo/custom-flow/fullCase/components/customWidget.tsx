import FormRender, { useForm } from 'form-render';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { firstTagSchema } from '../setting';
import '../index.less';
import { getColorByIndex } from '..';
import ReadOnlyPanel from './ReadOnlyPanel';

export interface AdvancedSettingWidgetProps {
  value: any;
  onChange: (value: any) => void;
  readOnly?: boolean;
}

export interface AdvancedSettingWidgetRef {
  validateForm: () => Promise<boolean>;
}

const CustomWidget = forwardRef<
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
        .catch((err) => {
          return false;
        });
    },
  }));

  // 监听表单变化
  const watch = {
    '#': (formData) => {
      onChange(formData);
    },
    'firstScene':(value)=>{
      if (value) {
        form.setValueByPath('title',`一级指标_${value}`)
      }
    }
  };

  useEffect(() => {
    if (value) {
      form.setValues(value);
    }
  }, []);

  return (
    <div>
      <FormRender
        form={form}
        schema={firstTagSchema}
        watch={watch}
        readOnly={readOnly}
        onMount={async () => {
          const res = await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: [
                  {
                    measureName: 'perform_jys_1d_all',
                    displayName: '用户活跃度指标',
                    description:
                      '用户活跃度指标反映了平台用户的参与程度和互动频率。该指标通过分析用户登录次数、浏览时长、功能使用频率等维度综合计算得出。活跃度分为高、中、低三个等级，分别对应不同的用户行为特征和参与度水平。',
                  },
                  {
                    displayName: '用户转化率',
                    measureName: 'perform_amt_1d',
                    description: '用户转化率指标衡量了从浏览到实际完成交易的用户比例。该指标通过分析用户行为路径，计算各环节的转化漏斗，识别用户流失的关键节点。转化率受多种因素影响，包括产品展示、价格策略、用户体验等。',
                  },
                  {
                    displayName: '平均停留时长',
                    measureName: 'perform_adr_1d',
                    description: '用户平均在平台上的停留时长，反映用户粘性和内容吸引力'
                  }
                ]
              });
            }, 100);
          });
          const enumData = (res?.data || []).map(
            (item: any, index: number) => ({
              name: item.displayName,
              code: item.measureName,
              description: item.description,
              color: getColorByIndex(index),
            }),
          );
          form.setValueByPath('tagData', enumData);
          form.setSchemaByPath('firstMeasure', {
            enum: (res?.data || [])?.map((v) => v.measureName) || [],
            enumNames:
              (res?.data || [])?.map((item) => `${item.displayName}(${item.measureName})`) || [],
          });
        }}
        // size="small"
        removeHiddenData={false}
        widgets={{ ReadOnlyPanel }}
      />
    </div>
  );
});

export default CustomWidget;
