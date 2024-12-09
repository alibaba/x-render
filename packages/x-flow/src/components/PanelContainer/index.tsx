import { Divider, Drawer, Input, Space } from 'antd';
import produce from 'immer';
import { debounce } from 'lodash';
import React, { FC, useContext, useEffect, useState, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import createIconFont from '../../utils/createIconFont';
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

const Panel: FC<IPanelProps> = (props: IPanelProps) => {
  // disabled属性取的地方可能不对------to do
  const { onClose, children, nodeType, disabled, node, description, id, data } =
    props;
  // 1.获取节点配置信息
  const { settingMap, iconFontUrl } = useContext(ConfigContext);
  const nodeSetting = settingMap[nodeType] || {};
  const { nodes, setNodes } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
    }),
    shallow
  );

  const isDisabled = ['Input', 'Output'].includes(nodeType) || disabled;
  const [descVal, setDescVal] = useState(data?.desc);
  const [titleVal, setTitleVal] = useState(data?.title || nodeSetting?.title);

  // const description = getDescription(nodeType, props.description);

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

  useEffect(() => {
    setDescVal(data?.desc);
    setTitleVal(data?.title || nodeSetting?.title);
  }, [JSON.stringify(data), id]);

  const Icon = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  return (
    <Drawer
      rootClassName='custom-node-panel'
      open={true}
      // width={400}  // 默认378
      mask={false}
      onClose={onClose}
      title={
        <>
          <div className='title-box'>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span
                className='icon-box'
                style={{ background: nodeSetting?.icon?.bgColor }}
              >
                <Icon
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
            <div className='title-actions'>
              <Space size={[4, 4]}>
                {!isDisabled && (
                  <>
                    <IconView type='icon-yunhang' style={{ fontSize: 16 }} />
                    <Divider type='vertical' />
                  </>
                )}
                {/* <IconView type='icon-help'/> */}
                <IconView
                  type='icon-remove'
                  style={{ fontSize: 16 }}
                  onClick={onClose}
                />
              </Space>
            </div>
          </div>
          <div className='desc-box'>
            {isDisabled ? (
              description
            ) : (
              <Input.TextArea
                placeholder='添加描述...'
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
