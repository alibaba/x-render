import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default function Map({ children, schema, getFieldProps, Field }) {
  const { title } = schema;
  const [collapsed, setCollapsed] = useState(false);

  const _children = children.map((key, idx) => {
    const fieldProps = getFieldProps(key);
    return <Field key={idx.toString()} {...fieldProps} />;
  });

  if (!title) {
    return <div className="w-100 flex flex-wrap">{_children}</div>;
  }

  const toggle = keyList => {
    if (keyList.length > 0) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-100">
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
    </div>
  );
}
