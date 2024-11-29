import FormRender, { useForm } from 'form-render';
import produce from 'immer';
import { debounce } from 'lodash';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfigContext } from '../../models/context';
import { useStore } from '../../hooks/useStore';

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

  const { nodes, setNodes } = useStore(
    useShallow((state: any) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
    }))
  );

  useEffect(() => {
    if (nodeSetting?.settingSchema) {
      form.resetFields();
      form.setValues(data || {});
    } else if (nodeSetting?.settingWidget) {
      setCustomVal(data);
    } else {
    }

  }, [JSON.stringify(data), id]);

  const handleNodeValueChange = debounce((data: any) => {
    const newNodes = produce(nodes, draft => {
      const node = draft.find(n => n.id === id);
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

  if (nodeSetting?.settingWidget) {
    const NodeWidget = widgets[nodeSetting?.settingWidget];
    return (
      <NodeWidget
        value={customVal}
        onChange={values => {
          setCustomVal(values);
          // onChange({ id, values: { ...values } });
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
  } else {
    return null;
  }
};

export default NodeEditor;
