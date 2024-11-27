import FormRender, { useForm } from 'form-render';
import React, { FC, useContext, useEffect } from 'react';
import { ConfigContext } from '../../models/context';
import { values } from 'lodash';
interface INodeEditorProps {
  data: any;
  onChange: (data: any) => void;
  nodeType: string;
  id: string;
}

const NodeEditor: FC<INodeEditorProps> = (props: any) => {
  const { data, onChange, nodeType, id } = props;
  const form = useForm();
  // // 1.获取节点配置信息
  const { settingMap, widgets } = useContext(ConfigContext);
  const nodeSetting = settingMap[nodeType] || {};

  useEffect(() => {
    form.resetFields();
    form.setValues(data || {});
  }, [JSON.stringify(data), id]);

  const watch = {
    '#': (allValues: any) => {
      onChange({ id, values: { ...allValues } });
    },
  };

  if (nodeSetting?.settingWidget) {
    const NodeWidget = widgets[nodeSetting?.settingWidget];
    return (
      <NodeWidget
        value={data}
        onChange={values => {
          onChange({ id, values: { ...values } });
        }}
      />
    );
  } else if (nodeSetting?.schema) {
    return (
      <FormRender
        schema={nodeSetting?.schema}
        form={form}
        // readOnly={readonly}
        widgets={widgets}
        watch={watch}
        // onMount={() => {
        //   form.setValues({ list: data?.list || [] });
        // }}
      />
    );
  } else {
    return null;
  }
};

export default NodeEditor;
