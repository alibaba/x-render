import React, { useEffect, useState } from 'react';
import { Card, Collapse } from 'antd';
import cn from 'classnames';
import { useStore2 } from '../../form-render-core/src/hooks';

const { Panel } = Collapse;

export default function Map({ children, title, schema }) {
  const [collapsed, setCollapsed] = useState(schema.collapsed || false);
  const { theme: globalTheme, displayType: globalDisplayType } = useStore2();

  const theme = schema.theme || globalTheme;
  const props = schema?.props || {};
  const displayType = schema.displayType || globalDisplayType;

  useEffect(() => {
    if (schema.hasOwnProperty('collapsed')) {
      setCollapsed(schema.collapsed);
    }
  }, [schema.collapsed]);

  if (!title) {
    return <div className="w-100">{children}</div>;
  }
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
      <Card
        id={title}
        title={
          <>
            {title}
            <span className="fr-desc ml2">
              {schema?.description ? `( ${schema.description} )` : ''}
            </span>
          </>
        }
        className="fr-theme-card-wrap"
      >
        {children}
        {/* <div className={`flex flex-wrap fr-core-obj`}>{children}</div> */}
      </Card>
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

  const toggle = keyList => {
    if (keyList.length > 0) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return (
    <div className="w-100">
      <Collapse
        activeKey={collapsed ? [] : ['1']}
        onChange={toggle}
        bordered={theme !== 'collapse:pure'}
        ghost={theme === 'collapse:ghost'}
      >
        <Panel
          header={
            <span style={{ fontSize: 16, fontWeight: 500 }}>
              {title}
              <span className="fr-desc ml2">
                {schema?.description ? `( ${schema.description} )` : ''}
              </span>
            </span>
          }
          key="1"
          className="fr-collapse-object"
        >
          <div
            className={cn({
              'fr-collapse-object-child-row': displayType === 'row',
              'fr-collapse-object-child-column': displayType === 'column',
            })}
          >
            {/* <div className={`flex flex-wrap fr-core-obj`}>
              {children}
            </div> */}
            {children}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
