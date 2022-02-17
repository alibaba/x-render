// configuration for scalable
export const baseCommonSettings = {
  type: {
    title: 'Type',
    type: 'string',
    hidden: '{{true}}',
  },
  widget: {
    title: 'Widget',
    type: 'string',
    hidden: '{{true}}',
  },
  format: {
    title: 'Format',
    type: 'string',
    hidden: '{{true}}',
  },
};

export const defaultCommonSettings = {
  $id: {
    title: 'ID',
    description: 'Field Name/Englis',
    type: 'string',
    widget: 'idInput',
    require: true,
    rules: [
      {
        pattern: '^#/.+$',
        message: 'Required field',
      },
    ],
  },
  title: {
    title: 'Title',
    type: 'string',
    widget: 'htmlInput',
  },
  displayType: {
    title: 'Title display mode',
    type: 'string',
    enum: ['row', 'column'],
    enumNames: ['Same line', 'Separate line'],
    widget: 'radio',
  },
  description: {
    title: 'Description',
    type: 'string',
  },
  default: {
    title: 'Default Value',
    type: 'string',
  },
  required: {
    title: 'Required field',
    type: 'boolean',
  },
  placeholder: {
    title: 'Placeholder',
    type: 'string',
  },
  bind: {
    title: 'Bind',
    type: 'string',
  },
  min: {
    title: 'Min value',
    type: 'number',
  },
  max: {
    title: 'Max value',
    type: 'number',
  },
  disabled: {
    title: 'Disabled',
    type: 'boolean',
  },
  readOnly: {
    title: 'Read Only',
    type: 'boolean',
  },
  hidden: {
    title: 'Hidden',
    type: 'boolean',
  },
  readOnlyWidget: {
    title: 'ReadOnly Widget',
    type: 'string',
  },
  width: {
    title: 'Width',
    type: 'string',
    widget: 'percentSlider',
  },
  labelWidth: {
    title: 'Label Width',
    description: 'Default value is 120',
    type: 'number',
    widget: 'slider',
    max: 400,
    props: {
      hideNumber: true,
    },
  },
};

export const elements = [
  {
    text: 'Input',
    name: 'input',
    schema: {
      title: 'Input box',
      type: 'string',
    },
    setting: {
      props: {
        title: 'Options',
        type: 'object',
        labelWidth: 80,
        properties: {
          allowClear: {
            title: 'Clear button',
            description: 'It only appears when there is content',
            type: 'boolean',
          },
          addonBefore: {
            title: 'Addon Before',
            type: 'string',
          },
          addonAfter: {
            title: 'Addon After',
            type: 'string',
          },
          prefix: {
            title: 'Prefix',
            type: 'string',
          },
          suffix: {
            title: 'Suffix',
            type: 'string',
          },
        },
      },
      minLength: {
        title: 'Min length',
        type: 'number',
      },
      maxLength: {
        title: 'Max length',
        type: 'number',
      },
      pattern: {
        title: 'Regular expression',
        type: 'string',
        props: {
          placeholder: 'Fill in the validation regular expression',
        },
      },
    },
  },
  {
    text: 'Textarea',
    name: 'textarea',
    schema: {
      title: 'Textarea',
      type: 'string',
      format: 'textarea',
    },
    setting: {
      props: {
        title: 'Options',
        type: 'object',
        labelWidth: 80,
        properties: {
          autoSize: {
            title: 'Auto Size',
            type: 'boolean',
          },
          row: {
            title: 'Number of Row',
            type: 'number',
          },
        },
      },
      minLength: {
        title: 'Min length',
        type: 'number',
      },
      maxLength: {
        title: 'Max length',
        type: 'number',
      },
      pattern: {
        title: 'Regular expression',
        type: 'string',
        props: {
          placeholder: 'Fill in the validation regular expression',
        },
      },
    },
  },
  {
    text: 'Date',
    name: 'date',
    schema: {
      title: 'Date',
      type: 'string',
      format: 'date',
    },
    setting: {
      format: {
        title: 'Format',
        type: 'string',
        enum: ['dateTime', 'date', 'time'],
        enumNames: ['DateTime', 'Date', 'Time'],
      },
    },
  },
  {
    text: 'Time',
    name: 'time',
    show: false,
    schema: {
      title: 'Time',
      type: 'string',
      format: 'time',
    },
    setting: {
      format: {
        title: 'Format',
        type: 'string',
        enum: ['dateTime', 'date', 'time'],
        enumNames: ['DateTime', 'Date', 'Time'],
      },
    },
  },
  {
    text: 'Digital input',
    name: 'number',
    schema: {
      title: 'Digital input',
      type: 'number',
    },
    setting: {},
  },
  {
    text: 'Checkbox',
    name: 'checkbox',
    schema: {
      title: 'Checkbox',
      type: 'boolean',
      widget: 'checkbox',
    },
    setting: {
      default: {
        title: 'Is checked by default',
        type: 'boolean',
      },
    },
  },
  {
    text: 'Switch',
    name: 'switch',
    schema: {
      title: 'Switch',
      type: 'boolean',
      widget: 'switch',
    },
    setting: {
      default: {
        title: 'Is selected by default',
        type: 'boolean',
      },
    },
  },
  {
    text: 'Select',
    name: 'select',
    schema: {
      title: 'Single select',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['A', 'B', 'C'],
      widget: 'select',
    },
    setting: {
      enumList: {
        title: 'Options',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'field',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'name',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
          addBtnProps: {
            children: 'Add Option',
            type: 'primary',
          },
        },
      },
    },
  },
  {
    text: 'Radio',
    name: 'radio',
    schema: {
      title: 'Radio',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['A', 'B', 'C'],
      widget: 'radio',
    },
    setting: {
      enumList: {
        title: 'Options',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'field',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'name',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
          addBtnProps: {
            children: 'Add Option',
            type: 'primary',
          },
        },
      },
    },
  },
  {
    text: 'MultiSelect',
    name: 'multiSelect',
    schema: {
      title: 'Multi Select',
      description: 'Drop down multiple select',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['a', 'b', 'c', 'd'],
      enumNames: ['A', 'B', 'C', 'D'],
      widget: 'multiSelect',
    },
    setting: {
      enumList: {
        title: 'Options',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'field',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'name',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
          addBtnProps: {
            children: 'Add Option',
            type: 'primary',
          },
        },
      },
    },
  },
  {
    text: 'Checkboxes',
    name: 'checkboxes',
    schema: {
      title: 'Multi Checkbox',
      type: 'array',
      widget: 'checkboxes',
      items: {
        type: 'string',
      },
      enum: ['a', 'b', 'c', 'd'],
      enumNames: ['A', 'B', 'C', 'D'],
    },
    setting: {
      enumList: {
        title: 'Options',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'field',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: 'name',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
          addBtnProps: {
            children: 'Add Option',
            type: 'primary',
          },
        },
      },
    },
  },
  {
    text: 'HTML',
    name: 'html',
    schema: {
      title: 'HTML',
      type: 'string',
      widget: 'html',
    },
    setting: {
      props: {
        type: 'object',
        properties: {
          value: {
            title: 'Html content',
            type: 'string',
          },
        },
      },
    },
  },
];

export const advancedElements = [
  {
    text: 'Date Range',
    name: 'dateRange',
    schema: {
      title: 'Date Range',
      type: 'range',
      format: 'dateTime',
      props: {
        placeholder: ['Start time', 'End time'],
      },
    },
    setting: {
      format: {
        title: 'Format',
        type: 'string',
        enum: ['dateTime', 'date'],
        enumNames: ['DateTime', 'Date'],
      },
    },
  },
  {
    text: 'Digital(slider)',
    name: 'slider',
    schema: {
      title: 'Digital(slider)',
      type: 'number',
      widget: 'slider',
    },
    setting: {},
  },
  {
    text: 'Image',
    name: 'image',
    schema: {
      title: 'Image',
      type: 'string',
      format: 'image',
    },
    setting: {},
  },
  {
    text: 'Color picker',
    name: 'color',
    schema: {
      title: 'Color picker',
      type: 'string',
      format: 'color',
    },
    setting: {},
  },
];

export const layouts = [
  {
    text: 'Object',
    name: 'object',
    schema: {
      title: 'Object',
      type: 'object',
      properties: {},
    },
    setting: {},
  },
  {
    text: 'List',
    name: 'list',
    schema: {
      title: 'Array',
      type: 'array',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: 'Min length',
        type: 'number',
      },
      max: {
        title: 'Max length',
        type: 'number',
      },
      props: {
        title: 'Options',
        type: 'object',
        properties: {
          foldable: {
            title: 'Foldable',
            type: 'boolean',
          },
          hideDelete: {
            title: 'Hide delete button',
            type: 'string',
          },
          hideAdd: {
            title: 'Hide add/copy button',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: 'Simple list',
    name: 'simpleList',
    schema: {
      title: 'Array',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: 'Mix length',
        type: 'number',
      },
      max: {
        title: 'Max length',
        type: 'number',
      },
      props: {
        title: 'Options',
        type: 'object',
        properties: {
          foldable: {
            title: 'Foldable',
            type: 'boolean',
          },
          hideTitle: {
            title: 'Hide Title',
            type: 'boolean',
          },
          hideDelete: {
            title: 'Hide delete button',
            type: 'string',
          },
          hideAdd: {
            title: 'Hide add/copy button',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: 'Table list',
    name: 'list2',
    schema: {
      title: 'Array',
      type: 'array',
      widget: 'list2',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: 'Min length',
        type: 'number',
      },
      max: {
        title: 'Max length',
        type: 'number',
      },
      props: {
        title: 'Options',
        type: 'object',
        properties: {
          foldable: {
            title: 'Foldable',
            type: 'boolean',
          },
          hideDelete: {
            title: 'Hide delete button',
            type: 'string',
          },
          hideAdd: {
            title: 'Hide add/copy button',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: 'Advanced list',
    name: 'drawerList',
    schema: {
      title: 'Array',
      type: 'array',
      widget: 'drawerList',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: 'Min length',
        type: 'number',
      },
      max: {
        title: 'Max length',
        type: 'number',
      },
      props: {
        title: 'Options',
        type: 'object',
        properties: {
          foldable: {
            title: 'Foldable',
            type: 'boolean',
          },
          hideDelete: {
            title: 'Hide delete button',
            type: 'string',
          },
          hideAdd: {
            title: 'Hide add/copy button',
            type: 'string',
          },
        },
      },
    },
  },
];

const saves = [
  {
    text: 'Complex sample',
    name: 'something',
    schema: {
      title: 'Object',
      description: 'This an object',
      type: 'object',
      properties: {
        inputName: {
          title: 'Input',
          type: 'string',
        },
        selectName: {
          title: 'Select',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['A', 'B', 'C'],
        },
        dateName: {
          title: 'Date',
          type: 'string',
          format: 'date',
        },
        listName: {
          title: 'Object Array',
          description: 'Nested Object Array',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rangeName: {
                title: 'Date range',
                type: 'range',
                format: 'date',
                props: {
                  placeholder: ['Start date', 'End date'],
                },
              },
            },
          },
        },
      },
    },
  },
];

export const defaultSettings = [
  {
    title: 'Base Widget',
    widgets: elements,
    show: true,
    useCommon: true,
  },
  {
    title: 'Advanced Widget',
    widgets: advancedElements,
  },
  {
    title: 'Layout Widget',
    widgets: layouts,
  },
  {
    title: 'Template',
    widgets: saves,
  },
];

export const defaultGlobalSettings = {
  type: 'object',
  properties: {
    column: {
      title: 'Overall layout',
      type: 'number',
      enum: [1, 2, 3, 4],
      enumNames: [
        '1 column/row',
        '2 columns/row',
        '3 columns/row',
        '4 columns/row',
      ],
      props: {
        placeholder: 'default is 1 column/row',
      },
    },
    labelWidth: {
      title: 'Label Width',
      type: 'number',
      widget: 'slider',
      max: 300,
      default: 120,
      props: {
        hideNumber: true,
      },
    },
    displayType: {
      title: 'Label display type',
      type: 'string',
      default: 'row',
      enum: ['row', 'column'],
      enumNames: ['Same line', 'Separate line'],
      widget: 'radio',
    },
  },
};
