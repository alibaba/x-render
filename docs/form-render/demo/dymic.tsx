import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

export enum Language {
  CN = 'cn',
  EN = 'en',
  CA = 'ca',
}

export const LanguageText = {
  [Language.CN]: '中文简体',
  [Language.EN]: '英文',
  [Language.CA]: '中文繁体',
};

export const LanguageEmailContent = {
  [Language.CN]: 'emailContent',
  [Language.EN]: 'emailContentEn',
  [Language.CA]: 'emailContentCa',
}

const items = Object.entries(LanguageText).map(([key, value]) => {
  return {
      label: value,
      key,
  }
})

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
      templateName: {
          title: '模版名称',
          type: 'string',
          displayType: 'row',
          required: true,
          props: {},
      },
      // language: {
      //     default: Language.CN,
      //     widget: 'tabs',
      //     type: 'string',
      //     props: {
      //         type: 'card',
      //         items: items
      //     },
      // },
      emailSubject: {
          title: '邮件标题',
          type: 'string',
          displayType: 'row',
          required: true,
          props: {},
          hidden: `{{formData.language !== 'cn'}}`
      },
      list: {
          title: '活动模版',
          type: 'array',
          widget: 'simpleList',
          items: {
              type: 'object',
              properties: {
                  input1: {
                      title: '输入框 A',
                      type: 'string',
                  },
                  input2: {
                      title: '输入框 B',
                      type: 'string',
                  },
                  input3: {
                      title: '输入框 C',
                      type: 'string',
                  },
              },
          },
      },
  },
};

const Demo = () => {
  const form = useForm();
  const [visible, setVisible] = useState();

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <div>
      <FormRender
          displayType='row'
          form={form}
          schema={schema}
          widgets={{
            "xxx": () => {
              return 'sdfadf'
            }
          }}
          onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
          debug={true}
        />
      
     
    </div>
  );
};

export default Demo;
