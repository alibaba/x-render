import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { useStore2 } from '../../hooks';
const { Panel } = Collapse;

export default function Map({ children, title, ...rest }) {
  const { theme, displayType, allCollapsed } = useStore2();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(allCollapsed);
  }, [allCollapsed]);

  if (!title) {
    return <div className="w-100">{children}</div>;
  }
  if (theme == '1') {
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
        </div>
        <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
          {children}
        </div>
      </div>
    );
  }

  // 新增卡片视图
  if (theme == '2') {
    const { id } = rest.schema
    return (
      <div class="fr-theme-card-wrap">
        <div>
          {/* title 容器的 id，用来加锚点用 */}
          <div 
            id={id || title}
            class="fr-theme-card-title"
          >
            {title}
          </div>
          <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
            {children}
          </div>
        </div>
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
      <Collapse activeKey={collapsed ? [] : ['1']} onChange={toggle}>
        <Panel
          header={
            <span style={{ fontSize: 16, fontWeight: 500 }}>{title}</span>
          }
          key="1"
          className="fr-collapse-object"
        >
          {children}
        </Panel>
      </Collapse>
    </div>
  );
}

// export default function map({ children, title }) {
//   return <div className="w-100">{children}</div>;
// }
