import React, { useState, FC } from 'react';
import { Collapse } from 'antd';
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
const FCollapse: FC<IProps> = (props) => {
  const { style, children, title, header, defaultExpand = true } = props;

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

  if (!title) {
    return <div className="w-100">{children}</div>;
  }

  return (
    <Collapse
      className='f-collapse'
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

export default FCollapse;
