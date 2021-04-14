import React from 'react';
import { Collapse } from 'antd';
import { useStore } from '../../hooks';
const { Panel } = Collapse;

export default function map({ children, title, ...rest }) {
  const { theme, displayType } = useStore();
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
  return (
    <div className="w-100">
      <Collapse defaultActiveKey={['1']}>
        <Panel
          header={<div style={{ fontSize: 16, fontWeight: 500 }}>{title}</div>}
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
