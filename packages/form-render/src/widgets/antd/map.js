import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useStore2 } from '../../form-render-core/src/hooks';

import FCollapse from '../container/FCollapse';
import FCard from '../container/FCard';

export default function Map({ children, title, schema }) {
  const { theme: globalTheme, displayType: globalDisplayType } = useStore2();

  const theme = schema.theme || globalTheme;
  const props = schema?.props || {};
  const displayType = schema.displayType || globalDisplayType;

  if (!title) {
    return <div className="w-100">{children}</div>;
  }


  return (
    <div className="w-100">
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
        <span className="fr-desc ml2">
          {schema?.description ? `( ${schema.description} )` : ''}
        </span>
      </div>
      <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
        {/* <div className={`flex flex-wrap fr-core-obj`}>{children}</div> */}
        {children}
      </div>
    </div>
  );
  
  if (theme === 'tile') {
    return (
      <div className="w-100">
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
          <span className="fr-desc ml2">
            {schema?.description ? `( ${schema.description} )` : ''}
          </span>
        </div>
        <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
          {/* <div className={`flex flex-wrap fr-core-obj`}>{children}</div> */}
          {children}
        </div>
      </div>
    );
  }

  // 新增卡片视图
  if (theme === 'card') {
    return (
      <FCard 
        id={title}
        title={
          <>
            {title}
            <span className="fr-desc ml2">
              {schema?.description ? `( ${schema.description} )` : ''}
            </span>
          </>
        }
      
      >
        {children}
      </FCard>
    );
  }

  // 支持自定义弹性布局
  if (theme === 'flex') {
    return (
      <div className="flex w-100" {...props}>
        {children}
      </div>
    );
  }

  return (
    <FCollapse 
      header={
        <span style={{ fontSize: 16, fontWeight: 500 }}>
          {title}
          <span className='fr-desc ml2'>
            {schema?.description ? `( ${schema.description} )` : ''}
          </span>
        </span>
      }
    >
      {children}
    </FCollapse>
  );
}
