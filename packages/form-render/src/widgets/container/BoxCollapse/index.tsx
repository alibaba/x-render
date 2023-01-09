import React, { useState, FC } from 'react';
import { Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';
import BoxPanel from '../BoxPanel';

const { Panel } = Collapse;
interface IProps {
  className?: any;
  style?: object;
  children: any;
  title?: string;
  description?: any;
  defaultExpand?: boolean;
  layout?: any
}

/**
 * 折叠面板
 */
const BoxCollapse: FC<IProps> = (props) => {
  const { style, children, title, description, defaultExpand = true, layout } = props;

  const [activeKey, setActiveKey] = useState<string>(defaultExpand ? 'single' : '');

  const collapseHeader = (
    <>
      {title && <div className='collapse-title'>{title}</div>}
      {description && description}
    </>
  );

  const renderExpandIcon = ({ isActive }: any): JSX.Element => {
    return (
      <div className='expand-icon-box'>
        <DownOutlined rotate={isActive ? 0 : -90 } style={{ fontSize: '16px'}} />
        {/* <span className='expand-icon-desc'>{isActive ? '收起' : '展开'}</span> */}
      </div>
    );
  };

  if (!title) {

    return <div className='w-100'>{children}</div>;
  }

  if (!title) {
    return (
      <BoxPanel schema={props}>
        {children}
      </BoxPanel>
    )
  }

  return (
    <Collapse
      className={classnames('f-collapse', { 'f-collapse-vertical' : layout === 'vertical'})}
      style={style}
      bordered={false}
      ghost={true}
      activeKey={[activeKey]}
      expandIcon={renderExpandIcon}
      onChange={() => setActiveKey(activeKey ? '' : 'single')}
    >
      <Panel key='single' header={collapseHeader} forceRender={true}>
        {children}
      </Panel>
    </Collapse>
  );
}

export default BoxCollapse;
