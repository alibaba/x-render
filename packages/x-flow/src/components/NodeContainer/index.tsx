import { Typography } from 'antd';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import createIconFont from '../../utils/createIconFont';
import './index.less';

const { Text, Paragraph } = Typography;

export default memo((props: any) => {
  const { className, onClick, children, icon, title, desc, hideDesc, NodeWidget, iconFontUrl } = props;
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  return (
    <div
      className={classNames('custom-node-container', {
        [className]: !!className,
      })}
      onClick={onClick}
    >
      <div className='node-title'>
        <span className='icon-box' style={{ background: icon?.bgColor }}>
          <IconBox {...icon} />
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
          className='node-desc'
        >
          {desc}
        </Paragraph>
      )}
    </div>
  );
});
