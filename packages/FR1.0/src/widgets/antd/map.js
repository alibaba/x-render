import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default function map({ children, title }) {
  if (!title) {
    return <div className="w-100">{children}</div>;
  }
  return (
    <div className="w-100">
      <Collapse defaultActiveKey={['1']}>
        <Panel header={title} key="1" className="fr-collapse-object">
          {children}
        </Panel>
      </Collapse>
    </div>
  );
}

// export default function map({ children, title }) {
//   return <div className="w-100">{children}</div>;
// }
