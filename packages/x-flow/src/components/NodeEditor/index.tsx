import FormRender, { Schema, useForm } from 'form-render';
import produce from 'immer';
import { debounce, isFunction } from 'lodash';
import React, { FC, useContext, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { safeJsonStringify, uuid } from '../../utils';

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
  const { settingMap, widgets, readOnly } = useContext(ConfigContext);
  const nodeSetting = settingMap[nodeType] || {};
  const [customVal, setCustomVal] = useState(data);
  const CustomSettingWidget = widgets[`${nodeType}NodeSettingWidget`]; // 内置setting组件
  const NodeWidget = widgets[nodeSetting?.settingWidget]; // 自定义面板配置组件
  const getSettingSchema = nodeSetting['getSettingSchema'];
  const [asyncSchema, setAsyncSchema] = useState<Schema>({});

  async function getSchema() {
    const shema = await getSettingSchema(
      id,
      nodeType,
      nodeSetting,
      data,
      form
    ).catch(() => ({}));
    setAsyncSchema(shema);
  }
  useEffect(() => {
    if (isFunction(getSettingSchema)) {
      getSchema();
    }
  }, []);

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
  }, [safeJsonStringify(data), id]);

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
        if (
          node?.data?._nodeType === 'Switch' ||
          node?.data?._nodeType === 'Parallel'
        ) {
          data['list'] = (data?.list || [])?.map((item, index) => {
            if (item?._id) {
              return item;
            } else {
              if (node?.data?.list?.length && node?.data?.list[index]?._id) {
                return {
                  ...item,
                  _id: node?.data?.list[index]?._id,
                };
              } else {
                return { ...item, _id: `id_${uuid()}` };
              }
            }
          });
        }
        const { _nodeType, _status, _isCandidate, title, desc } = node?.data;
        node.data = { _nodeType, _status, _isCandidate, title, desc, ...data }; // form-render的list如果为空，不会返回list相应的字段，只能全部替换data
      }
    });
    setNodes(newNodes, false);
  }, 100);

  const watch = {
    '#': (allValues: any) => {
      handleNodeValueChange({ ...allValues });
    },
  };

  if (nodeSetting?.settingWidget && NodeWidget) {
    return (
      <NodeWidget
        {...nodeSetting?.settingWidgetProps}
        value={customVal}
        onChange={values => {
          setCustomVal(values);
          handleNodeValueChange({ ...values });
        }}
        readOnly={readOnly}
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
        readOnly={readOnly}
      />
    );
  } else if (
    isFunction(getSettingSchema) &&
    Object.keys(asyncSchema).length > 0
  ) {
    return (
      <FormRender
        schema={asyncSchema}
        form={form}
        widgets={widgets}
        watch={watch}
        size={'small'}
        readOnly={readOnly}
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
        readOnly={readOnly}
      />
    );
  } else {
    return null;
  }
};

export default NodeEditor;
