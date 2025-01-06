import XFlow from '@xrenders/xflow';
import settings from './setting';

export default () => {
  const nodes = [
    {
      id: 'hwqfyj734kgwljvt',
      type: 'Start',
      position: {
        x: -159.0597703862493,
        y: 323.4293111587479,
      },
    },
    {
      id: 'kshd2hp4vqm8ww19',
      type: 'Switch',
      position: {
        x: 180.79626287562883,
        y: 209.9170981759363,
      },
      data: {
        list: [
          {
            _id: 'id_1nmzbhnbtv1se6sd', // 对应的 sourceHandle: 'id_1nmzbhnbtv1se6sd'的边
            value: '条件1',
            name: "这里是条件一",
            title:"默认title"
          },
          {
            value: '条件2',
            _id: 'id_enxhwfca1ebn55td', // 对应sourceHandle: 'id_enxhwfca1ebn55td'的边
            name:"这里是条件一"
          },
          {
            value: '条件3',
            _id: 'id_z1f7b93zwbx1xycu', // 对应sourceHandle: 'id_z1f7b93zwbx1xycu'的边
            name:'这里是条件一'
          },
        ],
        desc: '',
      },
    },
    {
      id: 'ql61j2tdli4xage0',
      type: 'Prompt',
      position: {
        x: 578.75,
        y: 176.25,
      },
    },
    {
      id: 'fab1j735q8iow6u3',
      type: 'knowledge',
      position: {
        x: 577.5,
        y: 318.75,
      },
    },
    {
      id: '9mc5i628mfrxdow0',
      type: 'Prompt',
      position: {
        x: 603.75,
        y: 422.5,
      },
    },
    {
      id: 'xgkajbbgs8cls8r1',
      type: 'knowledge',
      position: {
        x: 932.5,
        y: 556.25,
      },
    },
    {
      id: 'anmv2kcadqxj4k63',
      type: 'Prompt',
      position: {
        x: 540,
        y: 555,
      },
    },
    {
      id: '1obmsf5g1xfsypdj',
      type: 'End',
      position: {
        x: 1359.5373712437117,
        y: 359.3804592275014,
      },
    },
  ];

  const edges = [
    {
      id: '0lnn4hks9wnz0lnq',
      source: 'hwqfyj734kgwljvt',
      target: 'kshd2hp4vqm8ww19',
    },
    {
      id: '5s6af77jbcqvzfod',
      source: 'kshd2hp4vqm8ww19', // switch节点的边
      target: 'ql61j2tdli4xage0',
      sourceHandle: 'id_1nmzbhnbtv1se6sd', // 对应 _id为'id_1nmzbhnbtv1se6sd'的条件
    },
    {
      id: '6tw709qgc3mtazrv',
      source: 'kshd2hp4vqm8ww19', // switch节点的边
      target: 'fab1j735q8iow6u3',
      sourceHandle: 'id_enxhwfca1ebn55td', // 对应 _id为'id_enxhwfca1ebn55td'的条件
    },
    {
      id: 'vzlvdo69ljcqegc8',
      source: 'kshd2hp4vqm8ww19', // switch节点的边
      target: '9mc5i628mfrxdow0',
      sourceHandle: 'id_z1f7b93zwbx1xycu', // 对应 _id为'id_z1f7b93zwbx1xycu'的条件
    },
    {
      id: 'j8p8fnr5au9k25pb',
      source: 'kshd2hp4vqm8ww19', // switch节点的边
      target: 'anmv2kcadqxj4k63',
      sourceHandle: 'id_else', // id_else 对应默认路径ELSE
    },
    {
      id: '0qfpkc9vcjdb31qp',
      source: 'anmv2kcadqxj4k63',
      target: 'xgkajbbgs8cls8r1',
    },
    {
      id: '5h05o312rfbj4559',
      source: 'ql61j2tdli4xage0',
      target: '1obmsf5g1xfsypdj',
    },
    {
      source: 'fab1j735q8iow6u3',
      target: '1obmsf5g1xfsypdj',
      id: 'xy-edge__fab1j735q8iow6u3-1obmsf5g1xfsypdj',
    },
    {
      source: '9mc5i628mfrxdow0',
      target: '1obmsf5g1xfsypdj',
      id: 'xy-edge__9mc5i628mfrxdow0-1obmsf5g1xfsypdj',
    },
    {
      source: 'xgkajbbgs8cls8r1',
      target: '1obmsf5g1xfsypdj',
      id: 'xy-edge__xgkajbbgs8cls8r1-1obmsf5g1xfsypdj',
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
