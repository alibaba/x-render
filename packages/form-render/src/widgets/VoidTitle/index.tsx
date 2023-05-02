import React from 'react';
import { Card } from 'antd';
import BoxPanel from '../components/PanelView';

import './index.less';

const BoxCard = ({ schema }) => {
  return (
    <div className='fr-void-title'>
      {schema.title}
    </div>
  )
}

export default BoxCard;
