export const settings = [
  {
    title: '一级指标',
    type: 'primaryMetrics',
    targetHandleHidden: true,
    icon: {
      type: 'icon-start',
      bgColor: '#17B26A',
    },
    nodePanel: {
      hideDesc: true,
    },
    settingWidget: 'firstTagWidget',
    nodeWidget:'TagWidget'
  },
  {
    title: '二级指标',
    type: 'secondaryMetrics',
    sourceHandleHidden: true,
    icon: {
      type: 'icon-model',
      bgColor: '#6172F3',
    },
    nodePanel: {
      hideDesc: true,
    },
    settingWidget: 'secondTagWidget',
    nodeWidget: 'TagWidget'
  },
];

export const firstTagSchema = {
  type: 'object',
  // displayType: 'row',
  // labelCol: 6,
  // fieldCol: 18,
  className: 'settingSchemaStyle',
  properties: {
    firstScene: {
      title: '分类',
      type: 'string',
      widget: 'input',
      required: true,
      props: {
        allowClear: true,
      },
      readOnlyWidget: 'ReadOnlyPanel',
    },
    firstMeasure: {
      title: '指标',
      type: 'string',
      widget: 'select',
      required: true,
      props: {
        allowClear: true,
      },
      className: 'tag-select-style',
      // readOnlyWidget: 'ReadOnlyPanel',
    },
    tagData: {
      title: '标签',
      type: 'array',
      widget: 'simpleList',
      className: 'hidden-form-item',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          color: {
            type: 'string'
          }
        }
      }
    }
  },
};

export const secondTagSchema = {
  type: 'object',
  className: 'settingSchemaStyle',
  properties: {
    secondScene: {
      title: '分类',
      type: 'string',
      widget: 'input',
      required: true,
      props: {
        allowClear: true,
      },
      readOnlyWidget: 'ReadOnlyPanel',
    },

    secondMeasures: {
      title: '指标',
      type: 'array',
      widget: 'multiSelect',
      required: true,
      props: {
        maxTagCount: 1,
        mode: 'multiple',
        allowClear: true,
      },
      className: 'tag-select-style',
    },
    tagData: {
      title: '标签',
      type: 'array',
      widget: 'simpleList',
      className: 'hidden-form-item',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          color: {
            type: 'string'
          }
        }
      }
    }
  },
};
