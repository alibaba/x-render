import { Typography } from 'antd';
import classNames from 'classnames';
import React, { memo } from 'react';
import IconView from '../IconView';
import './index.less';

const { Text, Paragraph } = Typography;

export default memo((props: any) => {
  const { className, onClick, children, icon, title, desc, hideDesc, NodeWidget } = props;

  return (
    <div
      className={classNames('custom-node-container', {
        [className]: !!className,
      })}
      onClick={onClick}
    >
      <div className="node-title">
        <span className="icon-box" style={{ background: icon?.bgColor }}>
          <IconView {...icon} />
        </span>
        <Text
          style={{ width: 188, marginLeft: '8px' }}
          ellipsis={{ tooltip: title }}
        >
          {title}
        </Text>
      </div>
      <div className="node-body">{children}</div>
      {
        NodeWidget && <div className='node-widget'>
          {NodeWidget}
        </div>
      }
      {!hideDesc && !!desc && (
        <Paragraph
          ellipsis={{
            rows: 2,
            tooltip: { title: desc, placement: 'topRight' },
          }}
          className="node-desc"
        >
          {desc}
        </Paragraph>
      )}
    </div>
  );
});
