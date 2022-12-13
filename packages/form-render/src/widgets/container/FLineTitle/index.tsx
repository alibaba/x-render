import React from 'react';

const FLineTitle = ({ children, title, schema }) => {
  return (
    <div className='w-100'>
      <div
        style={{
          fontSize: 17,
          fontWeight: 500,
          paddingBottom: 4,
          borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
          marginBottom: 16,
        }}
      >
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
