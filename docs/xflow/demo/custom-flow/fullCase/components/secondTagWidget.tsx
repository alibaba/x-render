import FormRender, { useForm } from 'form-render';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import { secondTagSchema } from '../setting';
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

interface MeasureData {
  measureName: string;
  displayName: string;
}

const secondTagWidget = forwardRef<
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
    '#': (formData: any) => {
      onChange(formData);
    },
    secondScene: (value: string) => {
      if (value) {
        form.setValueByPath('title', `二级指标_${value}`);
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
        schema={secondTagSchema}
        watch={watch}
        readOnly={readOnly}
        onMount={async () => {
          const res = await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: [
                  {
                    displayName: '用户转化率',
                    measureName: 'perform_amt_1d',
                    description: '用户转化率指标衡量了从浏览到实际完成交易的用户比例。该指标通过分析用户行为路径，计算各环节的转化漏斗，识别用户流失的关键节点。转化率受多种因素影响，包括产品展示、价格策略、用户体验等。'
                  },
                  {
                    displayName: '平均停留时长',
                    measureName: 'perform_adr_1d',
                    description: '用户平均在平台上的停留时长，反映用户粘性和内容吸引力'
                  },
                  {
                    displayName: '多端访问量',
                    measureName: 'xz_ipvuv_daycnt_4client',
                    description: '多端访问量统计了用户在不同设备（PC、移动端、平板等）上的访问情况，用于分析用户使用习惯和平台适配性'
                  },
                  {
                    displayName: '用户留存率',
                    measureName: 'perform_jys_1d',
                    description: '用户留存率反映了用户持续使用平台的比率。该指标通过跟踪用户首次使用后的持续活跃情况，计算不同时间窗口（次日、7日、30日等）的留存率，评估产品的用户粘性和长期价值。'
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
          console.log('11hmy', res, enumData)
          form.setValueByPath('tagData', enumData);
          form.setSchemaByPath('secondMeasures', {
            enum:
              (res?.data || []).map((v: MeasureData) => v.measureName) || [],
            enumNames:
              (res?.data || []).map(
                (item: MeasureData) =>
                  `${item.displayName}(${item.measureName})`,
              ) || [],
          });
        }}
        size="small"
        widgets={{ ReadOnlyPanel }}
      />
    </div>
  );
});

export default secondTagWidget;
