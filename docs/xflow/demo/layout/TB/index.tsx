import XFlow from '@xrenders/xflow';
import { edges, nodes, settings } from './setting';

export default () => {
  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings as any}
        nodeSelector={{
          showSearch: true,
        }}
        layout="TB"
      />
    </div>
  );
};
