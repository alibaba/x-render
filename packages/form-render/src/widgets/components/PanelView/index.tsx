import React from 'react';
import classnames from 'classnames'
import './index.less';

const PanelView = ({ children } : any) => {
  return <div className={classnames('fr-panel', {'fr-panel-bordered' : true })}>{children}</div>;
}

export default PanelView;
