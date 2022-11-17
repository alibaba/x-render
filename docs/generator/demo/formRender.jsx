import Generator, {
  defaultCommonSettings,
  defaultGlobalSettings,
  defaultSettings,
} from 'fr-generator';
import React from 'react';
import FormRender from 'form-render';
import { Input } from 'antd'



const Demo = () => {
  console.log(defaultSettings, defaultCommonSettings, defaultGlobalSettings);
  const InputWidget = props => {
    const { schema, addons, ...reset } = props

    return (
      <Input {...reset} placeholder="please enter content..." />
    )
  }

  const customFormRender = (props) => {
    const { widgets, mapping, ...otherProps } = props;
    return (<FormRender
      {...otherProps}
      widgets={{
        ...widgets,
        input: InputWidget,
      }}
      mapping={{
        ...mapping
      }}
    />)
  }
  return (
    <div style={{ height: '50vh' }}>
      <Generator
        formRender={customFormRender}
        settings={[
          {
            title: '个人信息',
            widgets: [
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
