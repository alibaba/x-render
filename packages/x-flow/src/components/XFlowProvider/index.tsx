import { Provider } from '../../models/context';
import { createStore } from '../../models/store';

import type { ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

export const XFlowProvider = memo<{
  initialNodes: any[];
  initialEdges: any[];
  children: ReactNode;
}>(({ initialNodes: nodes, initialEdges: edges, children }) => {
  const [store] = useState(() =>
    createStore({
      nodes,
      edges,
    })
  );

  useEffect(() => {
    // TODO: 默认暂停时间，向 zundo 贡献代码
    console.info("暂停时间")
    // store.temporal.getState().pause();
  }, []);

  // TODO: 合并 Wrapper 和 withProvider
  return <Provider value={store}>{children}</Provider>;
});
