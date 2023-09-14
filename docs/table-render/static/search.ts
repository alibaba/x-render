export const schema = {
  type: 'object',
  labelWidth: 80,
  properties: {
    state: {
      title: '酒店状态',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '营业中', value: 'open' },
          { label: '已打烊', value: 'closed' },
        ],
      },
    },
    labels: {
      title: '酒店星级',
      type: 'string',
    },
    created_at: {
      title: '成立时间',
      type: 'string',
      format: 'date',
    },
  },
};

export const schema2 = {
  type: 'object',
  labelWidth: 80,
  properties: {
    state: {
      title: '酒店状态',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '营业中', value: 'open' },
          { label: '已打烊', value: 'closed' },
          { label: '暂停营业', value: 'stop' },
        ],
      },
    },
    labels: {
      title: '酒店星级',
      type: 'string',
    },
    created_at: {
      title: '成立时间',
      type: 'string',
      format: 'date',
    },
    labels1: {
      title: '酒店星级',
      type: 'string',
    },
    labels2: {
      title: '酒店地址',
      type: 'string',
    },
    labels3: {
      title: '酒店状态',
      type: 'string',
    },
    labels4: {
      title: '酒店区域',
      type: 'string',
    },
    labels5: {
      title: '酒店电话',
      type: 'string',
    },
    labels6: {
      title: '酒店价位',
      type: 'string',
    },
  },
};
