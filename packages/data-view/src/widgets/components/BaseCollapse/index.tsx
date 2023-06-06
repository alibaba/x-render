import React, { useState, FC } from 'react';
import { Collapse } from 'antd';
import { combineClass } from '../../utils/common';
import { DownOutlined } from '@ant-design/icons';
import './index.less';

const { Panel } = Collapse;
interface IProps {
  className?: any;
  style?: object;
  children: any;
  title?: string;
  header?: any;
  defaultExpand?: boolean;
}

/**
 * 折叠面板
 */
const BaseCollapse: FC<IProps> = (props) => {
  const { className, style, children, title, header, defaultExpand = true } = props;

  const [activeKey, setActiveKey] = useState<string>(defaultExpand ? 'single' : '');

  const collapseHeader = (
    <>
      {title && <div className="collapse-title">{title}</div>}
      {header && header}
    </>
  );

  const renderExpandIcon = ({ isActive }: any): JSX.Element => {
    return (
      <div className="expand-icon-box">
        <DownOutlined rotate={isActive ? 180 : 0} />
        <span className="expand-icon-desc">{isActive ? '收起' : '展开'}</span>
      </div>
    );
  };

  return (
    <Collapse
      className={combineClass('dtv-collapse', className)}
      style={style}
      bordered={false}
      ghost={true}
      activeKey={[activeKey]}
      expandIcon={renderExpandIcon}
      onChange={() => setActiveKey(activeKey ? '' : 'single')}
    >
      <Panel key="single" header={collapseHeader}>
        {children}
      </Panel>
    </Collapse>
  );
};

export default BaseCollapse;
