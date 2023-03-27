import React from 'react';
import { Card } from 'antd-mobile';

import './index.less';

const BoxCard = ({ children, title, description }) => {
  if (!title) {
    return (
      {children}
    )
  }
  return (
    <Card
      className='fr-obj-card'
      title={
        <>
          {title}
          {description && (
            <span className='fr-header-desc '>
              {description}
            </span>
          )}
        </>
      }
    >
      {children}
    </Card>
  );
}

export default BoxCard;
