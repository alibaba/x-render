export const settings = [
  {
    title: '开始', // 节点名称
    type: 'Start',
    hidden: true,
    targetHandleHidden: true,
    icon: {
      // 图标描述
      type: 'icon-start', // icon-font
      bgColor: '#17B26A', // 图标背景颜色
    },
    nodePanel: {
      width: 600,
      hideDesc: false,
    },
    settingSchema: {
      // 自定义节点配置
      type: 'object',
      properties: {
        input: {
          title: '变量一',
          type: 'string',
          widget: 'input',
        },
        select: {
          title: '变量二',
          type: 'string',
          widget: 'select',
          props: {
            options: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ],
          },
        },
        radio1: {
          title: '点击单选',
          type: 'string',
          widget: 'radio',
          props: {
            options: [
              { label: '早', value: 'a' },
              { label: '中', value: 'b' },
              { label: '晚', value: 'c' },
            ],
          },
        },
        textarea1: {
          title: '长文本',
          type: 'string',
          widget: 'textArea',
        },
        date1: {
          title: '日期选择',
          type: 'string',
          widget: 'datePicker',
        },
        dateRange1: {
          title: '日期范围',
          type: 'range',
          widget: 'dateRange',
        },
        time1: {
          title: '时间选择',
          type: 'string',
          widget: 'timePicker',
        },
        timeRange1: {
          title: '时间范围',
          type: 'range',
          widget: 'timeRange',
        },
      },
    },
  },
  {
    title: '结束',
    type: 'End',
    hidden: true,
    sourceHandleHidden: true,
    icon: {
      type: 'icon-end',
      bgColor: '#F79009',
    },
    settingSchema: {
      type: 'object',
      properties: {
        input: {
          title: '变量一',
          type: 'string',
          widget: 'input',
        },
        select: {
          title: '变量二',
          type: 'string',
          widget: 'select',
          props: {
            options: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ],
          },
        },
      },
    },
  },
  {
    title: 'Switch',
    type: 'Switch',
    description: '允许你根据 if/else 条件将 workflow 拆分成两个分支',
    icon: {
      type: 'icon-switch',
      bgColor: '#06AED4',
    },
    onTesting: (node, nodes) => {
      console.log("单点调试",node,nodes)
    },
  },
  {
    title: '工具',
    type: 'tool',
    description: '允许使用工具能力',
    icon: {
      type: 'icon-gongju',
      bgColor: '#2E90FA',
    },
  },
  {
    title: '工具',
    type: '_group', // 节点分组
    items: [
      {
        title: '代码执行',
        type: 'Code',
        description: '执行一段 Groovy 或 Python 或 NodeJS 代码实现自定义逻辑',
        iconSvg: (
          <svg
            t="1733888001185"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4378"
            width="200"
            height="200"
          >
            <path
              d="M700.427093 797.610667a39.253333 39.253333 0 0 1 0-56.746667l228.864-228.949333-221.610666-228.864a40.021333 40.021333 0 0 1-12.117334-28.330667 40.277333 40.277333 0 0 1 12.117334-28.330667 39.253333 39.253333 0 0 1 56.746666 0l254.037334 254.037334v0.597333a61.184 61.184 0 0 1-8.106667 62.890667L757.17376 797.610667a39.253333 39.253333 0 0 1-56.746667 0z m-434.688-7.338667L12.128427 536.746667a39.253333 39.253333 0 0 1 0-56.746667L273.07776 226.304a39.253333 39.253333 0 0 1 56.661333 0l0.426667 0.426667v0.597333a65.621333 65.621333 0 0 1 0 54.528v0.597333l-0.426667 0.682667-228.864 228.778667 221.866667 221.866666a40.533333 40.533333 0 0 1-28.416 68.864 39.936 39.936 0 0 1-28.586667-12.373333z m175.530667 8.533333c-26.965333-8.96-38.826667-27.306667-31.658667-48.810666l130.304-493.056a49.322667 49.322667 0 0 1 47.616-31.744h0.682667l0.597333 0.170666a51.797333 51.797333 0 0 1 31.317334 27.733334 26.026667 26.026667 0 0 1 0 21.248L490.251093 766.634667c-7.338667 22.016-20.309333 34.133333-36.693333 34.133333a39.850667 39.850667 0 0 1-12.288-2.218667z"
              p-id="4379"
              fill="#ffffff"
            ></path>
          </svg>
        ),
      },
      {
        title: '工具',
        type: 'tool',
        description: '允许使用工具能力',
        icon: {
          type: 'icon-gongju',
          bgColor: '#2E90FA',
        },
      },
    ],
  },
];

export const nodes = [
  {
    type: 'Start',
    id: '1',
    position: { x: -35, y: 268 },
  },
  {
    type: 'Switch',
    id: 'b6zsd6w5ah2b209t',
    position: { x: 277.5, y: 268 },
    data: {
      list: [
        {
          _id: 'iawoyh5niyi6zjob',
        },
      ],
    },
  },
  {
    type: 'Code',
    id: '3',
    position: { x: 675, y: 123.75 },
  },
  {
    type: 'tool',
    id: '4',
    position: { x: 686.25, y: 495 },
  },
  {
    type: 'End',
    id: '5',
    position: { x: 1176.2499999999998, y: 281.25 },
  },
];
export const edges = [
  {
    source: '3',
    target: '5',
    id: 'e3-5',
  },
  {
    source: '4',
    target: '5',
    id: 'e4-5',
  },
  {
    id: 'px7fsmha99pju315',
    source: '1',
    target: 'b6zsd6w5ah2b209t',
  },
  {
    type: 'buttonedge',
    source: 'b6zsd6w5ah2b209t',
    sourceHandle: 'iawoyh5niyi6zjob',
    target: '3',
    id: 'xy-edge__b6zsd6w5ah2b209tiawoyh5niyi6zjob-3',
  },
  {
    type: 'buttonedge',
    source: 'b6zsd6w5ah2b209t',
    sourceHandle: 'id_else',
    target: '4',
    id: 'xy-edge__b6zsd6w5ah2b209tid_else-4',
  },
];
