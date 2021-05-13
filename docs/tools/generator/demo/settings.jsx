import React from 'react';
import Generator, {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from 'fr-generator';

const NewWidget = ({ value = 0, onChange }) => (
  <button onClick={() => onChange(value + 1)}>{value}</button>
);

const Demo = () => {
  console.log(defaultSettings, defaultCommonSettings, defaultGlobalSettings);

  return (
    <div style={{ height: '50vh' }}>
      <Generator
        widgets={{ NewWidget }}
        settings={[
          {
            title: '个人信息',
            widgets: [
              {
                text: '计数器',
                name: 'asyncSelect',
                schema: {
                  title: '计数器',
                  type: 'number',
                  widget: 'NewWidget',
                },
                setting: {
                  api: { title: 'api', type: 'string' },
                },
              },
              {
                text: 'object',
                name: 'object',
                schema: {
                  title: '对象',
                  type: 'object',
                  properties: {},
                },
                setting: {},
              },
              {
                text: '姓名',
                name: 'name',
                schema: {
                  title: '输入框',
                  type: 'string',
                },
                setting: {
                  maxLength: { title: '最长字数', type: 'number' },
                },
              },
            ],
          },
        ]}
        commonSettings={{
          description: {
            title: '自定义共通用的入参',
            type: 'string',
          },
        }}
      />
    </div>
  );
};

export default Demo;
