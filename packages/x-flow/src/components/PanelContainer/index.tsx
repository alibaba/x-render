import { Divider, Drawer, Input, Space } from 'antd';
import produce from 'immer';
import { debounce } from 'lodash';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfigContext } from '../../models/context';
import useStore from '../../models/store';
import IconView from '../IconView';
import './index.less';

interface IPanelProps {
  disabled?: boolean; // 是否禁用  ---to do：确认一下取的地方
  nodeType: string;
  onClose: () => void;
  node?: { id: string; _isCandidate: boolean; _nodeType: string };
  description?: string; // 业务描述---to do ：确认一下取的地方---从data里面取？
  children?: any;
  id: string;
  data: any; // data值
}

const getDescription = (nodeType: string, description: string) => {
  if (nodeType === 'Input') {
    return '工作流的起始节点，用于设定启动工作流入参信息';
  }
  if (nodeType === 'Output') {
    return '工作流的最终节点，用于返回工作流运行后的出参信息';
  }
  return description || '';
};

const Panel: FC<IPanelProps> = (props: any) => {
  // disabled属性取的地方可能不对------to do
  const {
    onClose,
    children,
    nodeType,
    disabled,
    node,
    description,
    id,
    data,
  } = props;
  // 1.获取节点配置信息
  const { settingMap } = useContext(ConfigContext);
  const nodeSetting = settingMap[nodeType] || {};
  const { nodes, setNodes } = useStore(
    useShallow((state: any) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
    }))
  );

  const isDisabled = ['Input', 'Output'].includes(nodeType) || disabled;
  const [descVal, setDescVal] = useState(data?.desc);
  const [titleVal, setTitleVal] = useState(data?.title || nodeSetting?.title);

  // const description = getDescription(nodeType, props.description);

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

  useEffect(() => {
    setDescVal(data?.desc);
    setTitleVal(data?.title || nodeSetting?.title);
  }, [JSON.stringify(data), id]);


  return (
    <Drawer
      rootClassName="custom-node-panel"
      open={true}
      // width={400}  // 默认378
      mask={false}
      onClose={onClose}
      title={
        <>
          <div className="title-box">
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span
                className="icon-box"
                style={{ background: nodeSetting?.icon?.bgColor }}
              >
                <IconView
                  style={{ fontSize: 14, color: '#fff' }}
                  type={nodeSetting?.icon?.type}
                />
              </span>
              {isDisabled ? (
                <span style={{ marginLeft: '11px' }}>{nodeSetting?.title}</span>
              ) : (
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={data?.title || nodeSetting?.title}
                  value={titleVal} //  || nodeSetting?.title
                  onChange={e => {
                    setTitleVal(e.target.value);
                    handleNodeValueChange({ title: e.target.value });

                  }}
                />
              )}
            </div>
            <div className="title-actions">
              <Space size={[4, 4]}>
                {!isDisabled && (
                  <>
                    <IconView type="icon-bofang" style={{ fontSize: 18 }} />
                    <Divider type="vertical" />
                  </>
                )}
                {/* <IconView type='icon-help'/> */}
                <IconView
                  type="icon-remove"
                  style={{ fontSize: 16 }}
                  onClick={onClose}
                />
              </Space>
            </div>
          </div>
          <div className="desc-box">
            {isDisabled ? (
              description
            ) : (
              <Input.TextArea
                placeholder="添加描述..."
                autoSize={{ minRows: 1 }}
                value={descVal}
                // value={data?.desc}
                // defaultValue={description}
                onChange={e => {
                  setDescVal(e.target.value);
                  handleNodeValueChange({ desc: e.target.value });
                }}
              />
            )}
          </div>
        </>
      }
    >
      {children}
    </Drawer>
  );
};

export default React.memo(Panel);
