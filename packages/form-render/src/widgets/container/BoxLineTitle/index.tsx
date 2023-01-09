import React from 'react';
import BoxPanel from '../BoxPanel';
import './index.less';

const FLineTitle = ({ children, title, schema }) => {

  if (!title) {
    return (
      <BoxPanel schema={schema}>
        {children}
      </BoxPanel>
    );
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
