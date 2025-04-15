export const initNodes = [
  {
    id: 'n5lj2vtbm_1744364868686',
    type: 'primaryMetrics',
    data: {
      firstScene: '交易结果3',
      firstMeasure: 'perform_jys_1d_all',
      displayName: '用户活跃度指标',
      description:
        '用户活跃度指标反映了平台用户的参与程度和互动频率。该指标通过分析用户登录次数、浏览时长、功能使用频率等维度综合计算得出。活跃度分为高、中、低三个等级，分别对应不同的用户行为特征和参与度水平。',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 'w83nw5uz0_1744364868686',
    type: 'secondaryMetrics',
    data: {
      secondScene: '项目视角2',
      secondMeasures: [
        'perform_amt_1d',
        'perform_adr_1d',
        'xz_ipvuv_daycnt_4client',
        'perform_jys_1d',
      ],
      tagWidgetData: [
        {
          name: '用户转化率',
          code: 'perform_amt_1d',
          description:
            '用户转化率指标衡量了从浏览到实际完成交易的用户比例。该指标通过分析用户行为路径，计算各环节的转化漏斗，识别用户流失的关键节点。转化率受多种因素影响，包括产品展示、价格策略、用户体验等。',
          color: 'blue',
        },
        {
          name: '平均停留时长',
          code: 'perform_adr_1d',
          description: '用户平均在平台上的停留时长，反映用户粘性和内容吸引力',
          color: 'green',
        },
        {
          name: '多端访问量',
          code: 'xz_ipvuv_daycnt_4client',
          description:
            '多端访问量统计了用户在不同设备（PC、移动端、平板等）上的访问情况，用于分析用户使用习惯和平台适配性',
          color: 'red',
        },
        {
          name: '用户留存率',
          code: 'perform_jys_1d',
          description:
            '用户留存率反映了用户持续使用平台的比率。该指标通过跟踪用户首次使用后的持续活跃情况，计算不同时间窗口（次日、7日、30日等）的留存率，评估产品的用户粘性和长期价值。',
          color: 'orange',
        },
      ],
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 'vl9hmneno_1744364868686',
    type: 'secondaryMetrics',
    data: {
      secondScene: '视角3',
      secondMeasures: ['perform_adr_1d', 'perform_jys_1d'],
      tagWidgetData: [
        {
          name: '平均停留时长',
          code: 'perform_adr_1d',
          description: '用户平均在平台上的停留时长，反映用户粘性和内容吸引力',
          color: 'blue',
        },
        {
          name: '用户留存率',
          code: 'perform_jys_1d',
          description:
            '用户留存率反映了用户持续使用平台的比率。该指标通过跟踪用户首次使用后的持续活跃情况，计算不同时间窗口（次日、7日、30日等）的留存率，评估产品的用户粘性和长期价值。',
          color: 'green',
        },
      ],
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 'r6ctw58w1_1744364868686',
    type: 'secondaryMetrics',
    data: {
      secondScene: '342424',
      secondMeasures: ['perform_amt_1d'],
      tagWidgetData: [
        {
          name: '用户转化率',
          code: 'perform_amt_1d',
          description:
            '用户转化率指标衡量了从浏览到实际完成交易的用户比例。该指标通过分析用户行为路径，计算各环节的转化漏斗，识别用户流失的关键节点。转化率受多种因素影响，包括产品展示、价格策略、用户体验等。',
          color: 'blue',
        },
      ],
    },
    position: {
      x: 0,
      y: 0,
    },
  },
];

export const initEdges = [
  {
    source: 'n5lj2vtbm_1744364868686',
    target: 'w83nw5uz0_1744364868686',
    id: 'b1ye449b1',
  },
  {
    source: 'n5lj2vtbm_1744364868686',
    target: 'vl9hmneno_1744364868686',
    id: '51u53vc90',
  },
  {
    source: 'n5lj2vtbm_1744364868686',
    target: 'r6ctw58w1_1744364868686',
    id: '5um40pak9',
  },
];
