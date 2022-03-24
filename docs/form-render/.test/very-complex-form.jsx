import { Button } from 'antd';
import Form, { useForm } from 'form-render';
import React from 'react';
const numberRule = [
  {
    pattern: '^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{1,2})?$',
    message: '最多输入2位小数',
  },
  { required: true, message: '必填' },
];

const Demo = () => {
  const form = useForm();

  return (
    <div>
      <Form
        form={form}
        schema={schema}
        onFinish={(data, errors) => {
          console.log('data', data, 'errors', errors);
        }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;

var combinePriceDTO = type => {
  return {
    columns: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '13%',
          widget: 'html',
          default: ' ',
        },
        c2: {
          type: 'string',
          width: '7%',
          widget: 'html',
          default: '类目',
        },
        c3: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: '机票',
        },
        c4: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: '酒店',
        },
        c6: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: '火车票',
        },
        c5: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: '用车',
        },
      },
    },

    prestoreConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '13%',
          widget: 'html',
          default: '标准版',
        },
        c2: {
          type: 'string',
          width: '7%',
          widget: 'html',
          default: '预存',
        },
        flightPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        flightUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/航段'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/航段',
        },
        hotelPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        hotelUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/间夜'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/间夜',
        },
        trainPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        trainUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/张'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/张',
        },
        vehiclePrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        vehicleUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/单'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/单',
        },
      },
    },
    caeConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '13%',
          widget: 'html',
          default: ' ',
        },
        c2: {
          type: 'string',
          width: '7%',
          widget: 'html',
          default: '现付',
        },
        flightPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        flightUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/航段'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/航段',
        },
        c3: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: ' ',
        },
        trainPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        trainUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/张'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/张',
        },
      },
    },
    settlePeriodConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '10%',
          widget: 'html',
          default: '月结账期',
        },
        settlePeriod: {
          type: 'string',
          width: '10%',
          required: true,
          enum: ['30+20', '30+30', '30+45', '30+60'],
          widget: 'select',
          default: '30+20',
        },
        flightPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        flightUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/航段'],
          widget: 'select',
          disabled: true,
          default: type !== 2 ? '%' : '元/航段',
        },
        hotelPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        hotelUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/间夜'],
          widget: 'select',
          disabled: true,
          default: type !== 2 ? '%' : '元/间夜',
        },
        trainPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        trainUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/张'],
          widget: 'select',
          disabled: true,
          default: type !== 2 ? '%' : '元/张',
        },
        vehiclePrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        vehicleUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/单'],
          widget: 'select',
          disabled: true,
          default: type !== 2 ? '%' : '元/单',
        },
      },
    },
    flightItineraryConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: '机票行程单配置',
        },
        flightPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        flightUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/航段'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/航段',
        },
      },
    },
    flightNegotiatedConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '20%',
          widget: 'html',
          default: '机票协议托管配置',
        },
        flightPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        flightUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/航段'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/航段',
        },
      },
    },
    hotelNegotiatedConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '40%',
          widget: 'html',
          default: '酒店托管服务费配置',
        },
        hotelPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        hotelUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/间夜'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/间夜',
        },
      },
    },
    btripTrainTechnicalConfigDTO: {
      type: 'object',
      labelWidth: 0,
      properties: {
        c1: {
          type: 'string',
          width: '61%',
          widget: 'html',
          default: '商旅火车票技术服务费配置',
        },
        trainPrice: {
          type: 'string',
          width: '11%',
          required: true,
          rules: numberRule,
          default: '0',
        },
        trainUnit: {
          type: 'string',
          width: '9%',
          enum: ['%', '元/张'],
          widget: 'select',
          disabled: type !== 3,
          default: type !== 2 ? '%' : '元/张',
        },
      },
    },
  };
};

var schema = {
  type: 'object',
  properties: {
    name: {
      title: '定价包名称',
      type: 'string',
      required: true,
      width: '61%',
      placeholder: '输入定价包名称',
    },
    type: {
      title: '通用/优惠',
      type: 'number',
      enum: [1, 2],
      enumNames: ['通用定价', '优惠定价'],
      widget: 'radio',
      required: true,
      default: 1,
    },
    version: {
      title: '定价包版本',
      type: 'string',
      required: true,
      width: '61%',
      placeholder: '输入定价包版本',
    },
    serviceProtocols: {
      title: '合同服务',
      type: 'array',
      required: true,
      widget: 'checkboxes',
      enum: [
        '月结',
        '预存',
        '企业现付',
        '行程单服务',
        '机票协议托管服务',
        '酒店托管服务',
        '商旅火车票技术服务费',
      ],
      width: '40%',
    },
    packageType: {
      title: '计费配置',
      type: 'number',
      enum: [1, 2],
      required: true,
      enumNames: ['打包价', '单项组合价'],
      widget: 'radio',
      default: 1,
    },
    balePriceDTO: {
      title: '计费配置',
      type: 'object',
      required: true,
      hidden: '{{rootValue.packageType !== 1}}',
      labelWidth: 60,
      properties: {
        settlePeriod: {
          title: '账期',
          type: 'string',
          width: '20%',
          required: true,
          enum: ['30+20', '30+30', '30+45', '30+60'],
          widget: 'select',
          default: '30+20',
        },
        creditPrice: {
          title: '月结',
          type: 'string',
          required: true,
          width: '20%',
          props: {
            addonAfter: '%',
          },
          default: '0',
        },
        creditUnit: {
          type: 'string',
          default: '%',
          hidden: true,
        },
        prestorePrice: {
          title: '预存',
          type: 'string',
          width: '20%',
          required: true,
          default: '0',
          props: {
            addonAfter: '%',
          },
        },
        prestoreUnit: {
          type: 'string',
          default: '%',
          hidden: true,
        },
        caePrice: {
          title: '现付',
          type: 'string',
          width: '20%',
          required: true,
          default: '0',
          props: {
            addonAfter: '%',
          },
        },
        caeUnit: {
          type: 'string',
          default: '%',
          hidden: true,
        },
      },
    },
    priceType: {
      title: '计费配置',
      type: 'number',
      enum: [1, 2, 3],
      required: true,
      enumNames: ['定率', '定额', '混合'],
      hidden: '{{rootValue.packageType === 1}}',
      widget: 'radio',
      default: 1,
    },
    combinePriceDTO_1: {
      title: '价格配置',
      type: 'object',
      hidden: '{{rootValue.packageType === 1 || rootValue.priceType !== 1 }}',
      labelWidth: 0,
      properties: combinePriceDTO(1),
    },
    combinePriceDTO_2: {
      title: '价格配置',
      type: 'object',
      hidden: '{{rootValue.packageType === 1 || rootValue.priceType !== 2 }}',
      labelWidth: 0,
      properties: combinePriceDTO(2),
    },
    combinePriceDTO_3: {
      title: '价格配置',
      type: 'object',
      hidden: '{{rootValue.packageType === 1 || rootValue.priceType !== 3 }}',
      labelWidth: 0,
      properties: combinePriceDTO(3),
    },
  },
  displayType: 'row',
  labelWidth: 120,
};
