import { Divider, Drawer, Input, Space } from 'antd';
import produce from 'immer';
import { debounce, isNumber } from 'lodash';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { isTruthy, safeJsonStringify } from '../../utils';
import createIconFont from '../../utils/createIconFont';
import IconView from '../IconView';
import TextEllipsis from '../TextEllipsis';
import './index.less';

interface IPanelProps {
  disabled?: boolean; // 是否禁用  ---to do：确认一下取的地方
  nodeType: string;
  onClose: () => void;
  node?: {
    id: string;
    _isCandidate: boolean;
    _nodeType: string;
    _status?: string | undefined;
  };
  children?: any;
  id: string;
  data: any; // data值
  openLogPanel?: boolean; // 日志面板是否打开
}

const Panel: FC<IPanelProps> = (props: IPanelProps) => {
  // disabled属性取的地方可能不对------to do
  const {
    onClose,
    children,
    nodeType,
    disabled,
    node,
    id,
    data,
    openLogPanel,
  } = props;
  // 1.获取节点配置信息
  const {
    settingMap,
    iconFontUrl,
    globalConfig,
    antdVersion,
    readOnly,
    logPanel,
    onTesting,
  }: any = useContext(ConfigContext);
  const nodeSetting = settingMap[nodeType] || {};
  const { nodes, setNodes } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
    }),
    shallow
  );
  const isDisabled = disabled; // 目前没用
  const [descVal, setDescVal] = useState(data?.desc);
  const [titleVal, setTitleVal] = useState(data?.title || nodeSetting?.title);
  const { nodePanel, iconSvg, showTestingBtn } = nodeSetting;
  const hideDesc =
    nodePanel?.hideDesc ?? globalConfig?.nodePanel?.hideDesc ?? false;
  const isShowStatusPanel = Boolean(isTruthy(node?._status) && openLogPanel);
  const offsetRightStatus = isNumber(logPanel?.width)
    ? Number(logPanel?.width + 10)
    : 410;

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
    setNodes(newNodes, false);
  }, 100);

  useEffect(() => {
    setDescVal(data?.desc);
    setTitleVal(data?.title || nodeSetting?.title);
  }, [safeJsonStringify(data), id]);

  const Icon = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  const drawerVersionProps = useMemo(() => {
    if (antdVersion === 'V5') {
      return {
        rootClassName: 'custom-node-panel',
        open: true,
      };
    }
    // V4
    return {
      className: 'custom-node-panel',
      visible: true,
    };
  }, []);

  return (
    <Drawer
      {...drawerVersionProps}
      getContainer={false}
      key={id}
      width={nodePanel?.width || globalConfig?.nodePanel?.width || 400} // 改为配置的width 节点的width > 全局的width>  默认 400
      mask={false}
      onClose={onClose}
      headerStyle={{ paddingBottom: '12px' }}
      style={{
        position: 'absolute',
        right: isShowStatusPanel ? offsetRightStatus : 0,
      }}
      title={
        <>
          <div className="title-box">
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span
                className="icon-box"
                style={{ background: nodeSetting?.icon?.bgColor || '#F79009' }}
              >
                {iconSvg ? (
                  iconSvg
                ) : (
                  <Icon
                    style={{ fontSize: 14, color: '#fff' }}
                    type={nodeSetting?.icon?.type}
                  />
                )}
              </span>
              {isDisabled || readOnly ? (
                <TextEllipsis text={titleVal} style={{ marginLeft: '11px' }} />
              ) : (
                <Input
                  style={{ width: '100%' }}
                  value={titleVal}
                  onChange={e => {
                    setTitleVal(e.target.value);
                    handleNodeValueChange({ title: e.target.value });
                  }}
                />
              )}
            </div>
            <div className="title-actions">
              <Space size={[4, 4]}>
                {!isDisabled && showTestingBtn && (
                  <>
                    <IconView
                      type="icon-yunhang"
                      onClick={() => {
                        const n =
                          nodes?.find(item => item?.id === node?.id) || {};
                        onTesting && onTesting(n, nodes);
                      }}
                      style={{ fontSize: 16 }}
                    />
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
          {!hideDesc && (
            <div className="desc-box">
              {isDisabled || readOnly ? (
                descVal && (
                  <TextEllipsis
                    text={descVal}
                    type="paragraph"
                    rows={2}
                    className="readOnly-desc"
                  />
                )
              ) : (
                <Input.TextArea
                  placeholder="添加描述..."
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  value={descVal}
                  onChange={e => {
                    setDescVal(e.target.value);
                    handleNodeValueChange({ desc: e.target.value });
                  }}
                  disabled={readOnly}
                />
              )}
            </div>
          )}
        </>
      }
    >
      {children}
    </Drawer>
  );
};

export default React.memo(Panel);
