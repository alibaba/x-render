import React from 'react';
import './index.less';

const FLineTitle = ({ children, title, schema }) => {

  if (!title) {
    return <div className="w-100">{children}</div>;
  }
  
  return (
    <div className='fr-box-line-title'>
      <div className='fr-line-header'>
        {title}
        <span className='fr-desc ml2'>
          {schema?.description ? `( ${schema.description} )` : ''}
        </span>
      </div>
      {children}
    </div>
  );
}

export default FLineTitle
