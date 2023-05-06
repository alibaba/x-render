import { warn } from "../utils";

export const mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  integer: 'number',
  number: 'number',
  card: 'card',
  collapse: 'collapse',
  group: 'group',
  'string:dateTime': 'datePicker',
  'string:date': 'datePicker',
  'string:year': 'datePicker',
  'string:month': 'datePicker',
  'string:week': 'datePicker',
  'string:textarea': 'textarea',
  '*?enum': 'radio',
  '*?enum_long': 'selector',
  '*?readOnly': 'html', // TODO: html widgets for list / object
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getWidgetName(schema: any, _mapping = mapping) {
  const { type, format, enum: enums, readOnly, props } = schema;
  
  //如果已经注明了渲染widget，那最好
  if (schema['ui:widget'] || schema.widget) {
    return capitalizeFirstLetter(schema['ui:widget'] || schema.widget);
  } else {
    warn('Can not find widget in schema, please specify the widget you need', schema)
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
      list.push('*?enum');
    }
  }
  
  const _widget = format;
  if (_widget) {
    list.push(`${type}:${_widget}`);
  }
  
  if (type === 'object') {
    list.push('group')
  } else {
    list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件
  }
  
  let widgetName = '';
  list.some(item => {
    widgetName = _mapping[item];
    return !!widgetName;
  });
  const finalName = capitalizeFirstLetter(widgetName) 
  
  if (finalName) {
    return finalName;
  } else {
    warn('Unable to infer which widget to use, please specify the widget you need', schema);
    return 'html';
  }
}

export const extraSchemaList = {
  checkbox: {
    valuePropName: 'checked',
  },
  switch: {
    valuePropName: 'checked',
  },
};
