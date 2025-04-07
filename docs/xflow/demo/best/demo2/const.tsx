export const nodes = [
  {
    id: 'y01s4993gdvyknzf',
    type: 'startEvent',
    position: {
      x: 0,
      y: 120,
    },
    measured: {
      width: 268,
      height: 54,
    },
    selected: false,
    dragging: false,
    data: {
      _isCandidate: false,
      title: '开始',
      string: 'hello',
      string2: 'test',
      string3: '16',
      string4: '17',
      string5: '19',
      string6: 'hello world',
      string7: 'test',
    },
  },
  {
    id: 'bzydz67rlmv1n871',
    type: 'Switch',
    position: {
      x: 354,
      y: 120,
    },
    measured: {
      width: 268,
      height: 222,
    },
    selected: false,
    dragging: false,
    data: {
      _isCandidate: false,
      title: '条件分支',
      list: [
        {
          _id: 'yjrqixxjwfdn47of',
          name: '条件一',
          type: '类型一',
          value: 'a==12',
        },
        {
          name: '条件二',
          type: '类型一',
          value: 'a!=12',
          _id: 'id_wmu3t8gkanwg271a',
        },
      ],
    },
  },
  {
    id: 'mjw4se36aadccnbt',
    type: 'serviceTask',
    position: {
      x: 708,
      y: 22.5,
    },
    measured: {
      width: 268,
      height: 54,
    },
    selected: false,
    dragging: false,
    data: {
      _isCandidate: false,
      title: '知识检索_ncjg',
      properties: [
        {
          name: 'name1',
          value: 'value1',
        },
      ],
    },
  },
  {
    id: '6w52vnb5kwwq7pdj',
    type: 'receiveTask',
    position: {
      x: 708,
      y: 217.5,
    },
    measured: {
      width: 268,
      height: 73,
    },
    selected: false,
    data: {
      _isCandidate: false,
      title: '问题分类器_ysa6',
      desc: '问题分类描述',
      properties: [
        {
          name: '问题1',
          value: '值1',
        },
      ],
    },
  },
  {
    id: 'dm6eebudu8tmb4v3',
    type: 'Parallel',
    position: {
      x: 1062,
      y: 120,
    },
    measured: {
      width: 268,
      height: 196,
    },
    selected: false,
    dragging: false,
    data: {
      _isCandidate: false,
      title: '并行事件_49pn',
      properties: [
        {
          name: '属性',
          value: 'value',
        },
      ],
      list: [
        {
          _id: 'id_7m3vitc4qy476axa',
          name: '事件1',
          value: '描述1',
        },
        {
          _id: 'id_m26wo9298g3imnes',
          name: '事件2',
          value: '描述2',
        },
      ],
    },
  },
  {
    id: 'walnrnko6rjn56bx',
    type: 'userTask',
    position: {
      x: 1416,
      y: 22.5,
    },
    measured: {
      width: 268,
      height: 54,
    },
    selected: false,
    data: {
      _isCandidate: false,
      title: '代码执行_flcv',
      properties: [
        {
          name: 'name',
          value: 'value',
        },
      ],
    },
  },
  {
    id: 'rxoar6yr0whfr7ym',
    type: 'callActivity',
    position: {
      x: 1416,
      y: 217.5,
    },
    measured: {
      width: 268,
      height: 54,
    },
    selected: false,
    data: {
      _isCandidate: false,
      title: 'HTTP请求_pmkf',
      properties: [
        {
          name: 'name',
          value: 'value',
        },
      ],
    },
  },
  {
    id: 'qjmv9gxija93gxkb',
    type: 'endEvent',
    position: {
      x: 1770,
      y: 120,
    },
    measured: {
      width: 268,
      height: 54,
    },
    selected: true,
    dragging: false,
    data: {
      _isCandidate: false,
      title: '结束_af4u',
      nodeDesc: '流程结束',
    },
  },
];

export const edges = [
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
      stroke: '#c9c9c9',
    },
    markerEnd: {
      type: 'arrowclosed',
      color: '#c9c9c9',
    },
    deletable: true,
    source: 'y01s4993gdvyknzf',
    target: 'bzydz67rlmv1n871',
    id: 'xy-edge__y01s4993gdvyknzf-bzydz67rlmv1n871',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
      stroke: '#c9c9c9',
    },
    markerEnd: {
      type: 'arrowclosed',
      color: '#c9c9c9',
    },
    deletable: true,
    source: 'bzydz67rlmv1n871',
    sourceHandle: 'yjrqixxjwfdn47of',
    target: 'mjw4se36aadccnbt',
    id: 'xy-edge__bzydz67rlmv1n871yjrqixxjwfdn47of-mjw4se36aadccnbt',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
      stroke: '#c9c9c9',
    },
    markerEnd: {
      type: 'arrowclosed',
      color: '#c9c9c9',
    },
    deletable: true,
    source: 'bzydz67rlmv1n871',
    sourceHandle: 'id_wmu3t8gkanwg271a',
    target: '6w52vnb5kwwq7pdj',
    id: 'xy-edge__bzydz67rlmv1n871id_wmu3t8gkanwg271a-6w52vnb5kwwq7pdj',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
    },
    markerEnd: {
      type: 'arrowclosed',
    },
    deletable: true,
    source: 'mjw4se36aadccnbt',
    target: 'dm6eebudu8tmb4v3',
    id: 'xy-edge__mjw4se36aadccnbt-dm6eebudu8tmb4v3',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
      stroke: '#c9c9c9',
    },
    markerEnd: {
      type: 'arrowclosed',
      color: '#c9c9c9',
    },
    deletable: true,
    source: '6w52vnb5kwwq7pdj',
    target: 'dm6eebudu8tmb4v3',
    id: 'xy-edge__6w52vnb5kwwq7pdj-dm6eebudu8tmb4v3',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
      stroke: '#c9c9c9',
    },
    markerEnd: {
      type: 'arrowclosed',
      color: '#c9c9c9',
    },
    deletable: true,
    source: 'dm6eebudu8tmb4v3',
    sourceHandle: 'id_7m3vitc4qy476axa',
    target: 'walnrnko6rjn56bx',
    id: 'xy-edge__dm6eebudu8tmb4v3id_7m3vitc4qy476axa-walnrnko6rjn56bx',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
    },
    markerEnd: {
      type: 'arrowclosed',
    },
    deletable: true,
    source: 'dm6eebudu8tmb4v3',
    sourceHandle: 'id_m26wo9298g3imnes',
    target: 'rxoar6yr0whfr7ym',
    id: 'xy-edge__dm6eebudu8tmb4v3id_m26wo9298g3imnes-rxoar6yr0whfr7ym',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
    },
    markerEnd: {
      type: 'arrowclosed',
    },
    deletable: true,
    source: 'walnrnko6rjn56bx',
    target: 'qjmv9gxija93gxkb',
    id: 'xy-edge__walnrnko6rjn56bx-qjmv9gxija93gxkb',
  },
  {
    type: 'buttonedge',
    style: {
      strokeWidth: 1.5,
    },
    markerEnd: {
      type: 'arrowclosed',
    },
    deletable: true,
    source: 'rxoar6yr0whfr7ym',
    target: 'qjmv9gxija93gxkb',
    id: 'xy-edge__rxoar6yr0whfr7ym-qjmv9gxija93gxkb',
  },
];
