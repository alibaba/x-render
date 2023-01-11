import React from 'react';
import Color from 'color';

import { isObject, getArray, isUrl } from '../utils';

const fieldPropsList = ['placeholder', 'disabled', 'format'];


export const ErrorSchema = (schema: any) => {
  return (
    <div>
      <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
};

export const getLabel = (schema: any) => {
  const { title, description, descType } = schema;

  return title;
  if (descType === 'icon') {
    return title;
  }
  return (
    <>
      {title}
      {description && (
        <span className='fr-desc ml2'>
          ({description})
        </span>
      )}
    </>
  )
};


export const getTooltip = (schema: any, displayType: string) => {
  const { descType, description } = schema;

  if (descType === 'widget' || !description) {
    return null;
  }

  if (displayType === 'row') {
    return {
      title: description
    }
  }

  if (displayType === 'column' && descType === 'icon') {
    return {
      title: description
    }
  }
  return null;
};

export const getRuleList = (schema: any, form: any) => {
  let { type, format, required, max, min, maxLength, minLength, rules: ruleList = [], pattern, title, message: msg } = schema;
  let rules: any = [...ruleList];

  max = max ?? maxLength;
  min = min ?? minLength;

  if (max) {
    rules.push({ type, max: max * 1 });
  }

  if (min) {
    rules.push({ type, min: min * 1 });
  }
  
  if (required) {
    rules.push({ type, required: true,  whitespace: true });
  }

  if (pattern) {
    rules.push({ pattern });
  }

  if (format === 'url') {
    rules.push({ type: 'url' });
  }

  if (format === 'email') {
    rules.push({ type: 'email' });
  }

  if (format === 'image') {
    rules.push({
      validator: (_: any, value: any) => {
        const imagePattern = '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)';
        const _isUrl = isUrl(value);
        const _isImg = new RegExp(imagePattern).test(value);
        return _isUrl && _isImg;
      }, 
      message: '请输入正确的图片格式'
    });
  }

  if (format === 'color') {
    rules.push({
      validator: (_: any, value: any) => {
        try {
          Color(value || null); // 空字符串无法解析会报错，出现空的情况传 null
          return true;
        } catch (e) {
          return false;
        }
      }, 
      message: '请填写正确的颜色格式'
    });
  }

  rules = rules.map(((item: any) => {
    if (item.validator && !item.transformed) {
      const validator = item.validator;
      item.validator = async (_: any, value: any) => {
        const result = await validator(_, value, { form });
        return result ? Promise.resolve() : Promise.reject(new Error(item.message));
      };;
      item.transformed = true;
    }
    return item;
  }));

  return rules;
}

export const getColSpan = (formCtx: any, parentCtx: any, schema: any) => {
  let span = 24;

  const column = getParamValue(formCtx, parentCtx, schema)('column');

  if (column) {
    span = 24 / column;
  }

  // 兼容 1.0 逻辑
  if (schema.width) {
    if (schema.width === '100%') {
      span = 24;
    } else if (schema.width === '50%') {
      span = 12;
    } else if (schema.width === '20%') {
      span = 5;
    } else if (schema.width < '50%') {
      span = 8;
    }
  }
  
  return span;
};

export const getParamValue = (formCtx: any, parentCtx: any, schema: any) => (param: string) => {
  return schema[param] ?? parentCtx[param] ?? formCtx[param];
}

export const getValuePropName = (widgetName: string) => {
  const valuePropNameObject = {
    checkbox: 'checked',
    switch: 'checked'
  };

  return valuePropNameObject[widgetName] || undefined;
}


export const getWidgetProps = ({ schema, children, widgets }) => {
  const widgetProps = {
    children,
    ...schema.props,
  };

  fieldPropsList.forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  // 兼容 1.0 版本逻辑 enum => options
  if (schema.enum && !schema.props?.options) {
    const { enum: enums, enumNames } = schema;
    widgetProps.options = getArray(enums).map((item: any, index: number) => {
      let label = enumNames && Array.isArray(enumNames) ? enumNames[index] : item;
      const isHtml = typeof label === 'string' && label[0] === '<';
      if (isHtml) {
        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
      }
      return { label, value: item };
    });
  }

  // 以 props 结尾的属性，直接透传
  Object.keys(schema).forEach(key => {
    if (
      typeof key === 'string' &&
      key.toLowerCase().indexOf('props') > -1 &&
      key.length > 5
    ) {
      widgetProps[key] = schema[key];
    }
  });

  // 支持 addonAfter 为自定义组件的情况
  if (isObject(widgetProps.addonAfter) && widgetProps.addonAfter.widget) {
    const AddonAfterWidget = widgets[widgetProps.addonAfter.widget];
    widgetProps.addonAfter = <AddonAfterWidget {...schema} />;
  }

  widgetProps.schema = schema;
  return widgetProps;
}