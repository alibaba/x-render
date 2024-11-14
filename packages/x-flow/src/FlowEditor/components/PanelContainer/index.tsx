import React from 'react';
import { Divider, Drawer, Input, Space } from 'antd';
import IconView from '../../components/IconView';
import './index.less';

const getDescription = (nodeType: string, description: string) => {
  if (nodeType === 'Input') {
    return '工作流的起始节点，用于设定启动工作流入参信息';
  }
  if (nodeType === 'Output') {
    return '工作流的最终节点，用于返回工作流运行后的出参信息';
  }
  return description || '';
};

const Panel = (props: any) => {
  const { onClose, children, title, icon, nodeType, disabled, node } = props;

  const isDisabled = ['Input', 'Output'].includes(nodeType) || disabled;
  const description = getDescription(nodeType, props.description);


  return (
    <Drawer
      rootClassName="custom-node-panel"
      open={true}
      width={720}
      mask={false}
      onClose={onClose}
      title={
        <>
          <div className="title-box">
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span className="icon-box" style={{ background: icon?.bgColor }}>
                <IconView
                  style={{ fontSize: 14, color: '#fff' }}
                  type={icon?.type}
                />
              </span>
              {isDisabled ? (
                <span style={{ marginLeft: '11px' }}>{title}</span>
              ) : (
                <Input style={{ width: '100%' }} value={title} />
              )}
            </div>
            <div className="title-actions">
              <Space size={[4, 4]}>
                {!isDisabled && (
                  <>
                    <IconView
                      type="icon-bofang"
                      style={{ fontSize: 18 }}
                     
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
          <div className="desc-box">
            {isDisabled ? (
              description
            ) : (
              <Input.TextArea
                placeholder="添加描述..."
                autoSize={{ minRows: 1 }}
                defaultValue={description}
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
