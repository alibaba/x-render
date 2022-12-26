import React from 'react';
import { Card } from 'antd';
import './index.less';

const BoxCard = ({ children, title, schema }) => {
  return (
    <Card
      className='fr-card'
      title={
        <>
          {title}
          <span className='fr-desc ml2'>
            {schema?.description ? `( ${schema.description} )` : ''}
          </span>
        </>
      }
      hoverable={true}
    >
      {children}
    </Card>
  );
}

export default BoxCard;
