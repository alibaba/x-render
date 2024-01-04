import React from 'react';
import './index.less';

const HeaderTitle = (props: any) => {
  const { title, description } = props;

  return (
    <div className='fr-obj-header'>
      <span className='fr-header-title'>{title}</span>
      {description && <span className='fr-header-desc'>( {description} )</span>}
    </div>
  );
}

export default HeaderTitle
