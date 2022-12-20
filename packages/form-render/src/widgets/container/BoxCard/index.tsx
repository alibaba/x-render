import React from 'react';
import { Card } from 'antd';

const BoxCard = ({ children, title, schema }) => {
  debugger;
  if (!title) {
    return <div className='w-100'>{children}</div>;
  }

  return (
    <Card
      title={
        <>
          {title}
          <span className='fr-desc ml2'>
            {schema?.description ? `( ${schema.description} )` : ''}
          </span>
        </>
      }
    >
      {children}
    </Card>
  );
}

export default BoxCard;
