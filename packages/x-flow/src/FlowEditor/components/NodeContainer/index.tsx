import React, { memo } from 'react';
import IconView from '../../components/IconView';
import classNames from 'classnames';
import './index.less';

export default memo((props: any) => {
  const { className, onClick, children, icon, title, desc, hideDesc } = props;

  return (
    <div className={classNames('custom-node-container', { [className]: !!className })} onClick={onClick}>
      <div className='node-title'>
        <span className='icon-box' style={{ background: icon.bgColor }}><IconView {...icon} /></span>
        <span style={{ marginLeft: '8px' }}>{title}</span>
      </div>
      <div className='node-body'>{children}</div>
      {(!hideDesc && !!desc) && (
        <div className='node-desc'>
          {desc}
        </div>
      )}
    </div>
  );
})


