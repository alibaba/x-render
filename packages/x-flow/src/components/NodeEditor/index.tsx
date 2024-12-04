import FormRender, { useForm } from 'form-render';
import produce from 'immer';
import { debounce } from 'lodash';
import React, { FC, useContext, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';

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
  const [customVal, setCustomVal] = useState(data);
  const CustomSettingWidget = widgets[`${nodeType}NodeSettingWidget`]; // 内置setting组件
  const NodeWidget = widgets[nodeSetting?.settingWidget]; // 自定义面板配置组件

  const { nodes, setNodes } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
    }),
    shallow
  );

  useEffect(() => {
    if (nodeSetting?.settingSchema) {
      // 自定义Schema
      form.resetFields();
      form.setValues(data || {});
    } else if (nodeSetting?.settingWidget) {
      // 自定义组件
      setCustomVal(data);
    } else {
      //可能为内置schema或者是没有
    }
  }, [JSON.stringify(data), id]);

  const handleNodeValueChange = debounce((data: any) => {
    const newNodes = produce(nodes, draft => {
      let node = null;
      // 反向查询ID，因为有多个ID相同的元素
      for (let i = draft?.length - 1; i >= 0; i--) {
        if (draft[i].id === id) {
          node = draft[i];
          break;
        }
      }
      if (node) {
        // 更新节点的 data
        node.data = { ...node.data, ...data };
      }
    });
    setNodes(newNodes);
  }, 100);

  const watch = {
    '#': (allValues: any) => {
      handleNodeValueChange({ ...allValues });
      // onChange({ id, values: { ...allValues } });
    },
  };

  if (nodeSetting?.settingWidget && NodeWidget) {
    return (
      <NodeWidget
        value={customVal}
        onChange={values => {
          setCustomVal(values);
          handleNodeValueChange({ ...values });
        }}
      />
    );
  } else if (nodeSetting?.settingSchema) {
    return (
      <FormRender
        schema={nodeSetting?.settingSchema}
        form={form}
        widgets={widgets}
        watch={watch}
        size={'small'}
      />
    );
  } else if (CustomSettingWidget) {
    // 内置节点
    return (
      <CustomSettingWidget
        onChange={val => {
          handleNodeValueChange({ ...val });
        }}
        value={data}
      />
    );
  } else {
    return null;
  }
};

export default NodeEditor;
