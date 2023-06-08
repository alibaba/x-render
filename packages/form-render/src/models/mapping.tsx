export const mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'inputNumber',
  object: 'map',
  html: 'html',
  card: 'card',
  collapse: 'collapse',
  lineTitle: 'lineTitle',
  line: 'line',
  subItem: 'subItem',
  panel: 'panel',
  'string:upload': 'upload',
  'string:url': 'urlInput',
  'string:dateTime': 'datePicker',
  'string:date': 'datePicker',
  'string:year': 'datePicker',
  'string:month': 'datePicker',
  'string:week': 'datePicker',
  'string:quarter': 'datePicker',
  'string:time': 'timePicker',
  'string:textarea': 'textArea',
  'string:color': 'color',
  'string:image': 'imageInput',
  'range:time': 'timeRange',
  'range:dateTime': 'dateRange',
  'range:date': 'dateRange',
  'range:year': 'dateRange',
  'range:month': 'dateRange',
  'range:week': 'dateRange',
  'range:quarter': 'dateRange',
  '*?enum': 'radio',
  '*?enum_long': 'select',
  'array?enum': 'checkboxes',
  'array?enum_long': 'multiSelect',
  '*?readOnly': 'html', // TODO: html widgets for list / object
};

export function getWidgetName(schema, _mapping = mapping) {
  const { type, format, enum: enums, readOnly, widget, props } = schema;

  //如果已经注明了渲染widget，那最好
  if (schema['ui:widget'] || schema.widget) {
    return schema['ui:widget'] || schema.widget;
  }

  const list: string[] = [];
  if (readOnly) {
    list.push(`${type}?readOnly`);
    list.push('*?readOnly');
  }

  if (enums) {
    // 根据 enum 长度来智能选择控件
    if (
      Array.isArray(enums) &&
      ((type === 'array' && enums.length > 6) ||
        (type !== 'array' && enums.length > 2))
    ) {
      list.push(`${type}?enum_long`);
      list.push('*?enum_long');
    } else {
      list.push(`${type}?enum`);
      // array 默认使用 list，array?enum 默认使用 checkboxes，*?enum 默认使用select
      list.push('*?enum');
    }
  }

  if (props?.options) {
    if ((type === 'array' && props.options.length > 6) || (type !== 'array' && props.options.length > 2)) {

      list.push(`${type}?enum_long`);
      list.push('*?enum_long');
    } else {
      list.push(`${type}?enum`);
      // array 默认使用 list，array?enum 默认使用 checkboxes，*?enum 默认使用select
      list.push('*?enum');
    }
  }
  
  const _widget = format;
  if (_widget) {
    list.push(`${type}:${_widget}`);
  }
  
  if (type === 'object') {
    list.push((schema.theme === 'tile' ? 'lineTitle' : schema.theme) || 'collapse');
  } else {
    list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件
  }

  let widgetName = '';
  list.some(item => {
    widgetName = _mapping[item];
    return !!widgetName;
  });

  return widgetName;
}


function capitalizeFirstLetter(str: any) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getWidget = (name: string, widgets: any) => {
  let widget = widgets[name];

  // name 转成首字母大写
  if (!widget) {
    widget = widgets[capitalizeFirstLetter(name)];
  }

  if (!widget) {
    widget = widgets['Html'] || null;
  }

  return widget;
}

export const extraSchemaList = {
  checkbox: {
    valuePropName: 'checked',
  },
  switch: {
    valuePropName: 'checked',
  },
};
