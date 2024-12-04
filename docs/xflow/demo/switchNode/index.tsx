import XFlow from '@xrenders/xflow';
import settings from './setting';

export default () => {
  const nodes = [
    {
      type: 'Start',
      id: '1',
      position: { x: -130, y: 290 },
    },
    {
      type: 'Switch',
      id: '2',
      position: { x: 171.25, y: 218.75 },
      data: { switchData: [{ value: '条件1' }] },
    },
    {
      type: 'End',
      id: '3',
      position: { x: 915, y: 287.5 },
    },
    {
      id: 'g29rz9ol4ugqz8m8',
      type: 'Prompt',
      position: { x: 525, y: 210 },
    },
    {
      id: 'swqutt73ihfa9lkb',
      type: 'knowledge',
      position: { x: 522.5, y: 472.5 },
    },
  ];

  const edges = [
    {
      source: '1',
      target: '2',
      id: 'xy-edge__1-2',
    },
    {
      source: '2',
      sourceHandle: 'id_0',
      target: 'g29rz9ol4ugqz8m8',
      id: 'xy-edge__2id_0-g29rz9ol4ugqz8m8',
    },
    { id: 'w6vmrun9sos4t6ds', target: 'swqutt73ihfa9lkb' },
    {
      source: '2',
      sourceHandle: 'id_else',
      target: 'swqutt73ihfa9lkb',
      id: 'xy-edge__2id_else-swqutt73ihfa9lkb',
    },
    {
      source: 'g29rz9ol4ugqz8m8',
      target: '3',
      id: 'xy-edge__g29rz9ol4ugqz8m8-3',
    },
    {
      source: 'swqutt73ihfa9lkb',
      target: '3',
      id: 'xy-edge__swqutt73ihfa9lkb-3',
    },
  ];

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
      />
    </div>
  );
};
