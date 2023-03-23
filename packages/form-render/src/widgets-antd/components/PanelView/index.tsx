import React from 'react';
import classnames from 'classnames'
import './index.less';

const PanelView = ({ children, bordered } : any) => {
  return <div className={classnames('fr-panel', {'fr-panel-bordered' : bordered })}>{children}</div>;
}

export default PanelView;
