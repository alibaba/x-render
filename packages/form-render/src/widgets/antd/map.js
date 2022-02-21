import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default function Map({
  children,
  schema,
  displayType,
  dataIndex,
  hideTitle,
  Field,
}) {
  const { title } = schema;
  const { theme, allCollapsed } = {}; // TODO!
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(allCollapsed);
  }, [allCollapsed]);

  const _children = children.map((child, i) => {
    const FRProps = {
      displayType,
      id: child,
      dataIndex,
      hideTitle,
    };
    return <Field key={i.toString()} {...FRProps} />;
  })

  if (!title) {
    return <div className="w-100">{_children}</div>;
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
          {_children}
        </div>
      </div>
    );
  }

  // 新增卡片视图
  if (theme == '2') {
    const { id } = schema;
    return (
      <div class="fr-theme-card-wrap">
        <div>
          {/* title 容器的 id，用来加锚点用 */}
          <div id={id || title} class="fr-theme-card-title">
            {title}
          </div>
          <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
            {_children}
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
    <div className="flex flex-wrap w-100">
      <Collapse activeKey={collapsed ? [] : ['1']} onChange={toggle}>
        <Panel
          header={
            <span style={{ fontSize: 16, fontWeight: 500 }}>{title}</span>
          }
          key="1"
          className="fr-collapse-object"
        >
          {_children}
        </Panel>
      </Collapse>
    </div>
  );
}
