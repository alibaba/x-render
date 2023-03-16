import React from 'react';
import { _get, isObject, getArray, isArray, isNumber } from '../../utils';

// return dataIndex、dataPath、schemaPath
const getPathObj = ({ rootPath = [], path }) => {
  const pathList = (path || '').split('.');
  const dataIndex = [];
  const schemaIndex = [];
  const dataPathList = [];

  // dataIndex
  rootPath.forEach((item: any, index: number) => {
    if (isNumber(item)) {
      dataIndex.push(item);
      return;
    }

    if (isNumber(rootPath[index+1])) {
      schemaIndex.push(`${item}[]`);
    } else {
      schemaIndex.push(item);
    }
  });

  // dataPath
  let list = [...rootPath];
  list.pop();
  list = [...list, ...pathList];

  list.forEach((item: any, index: number) => {
    if (isNumber(item)) {
      dataPathList.push(`[${item}]`)
    } else {
      dataPathList.push(item)
    }
  });

  const dataPath = dataPathList.join('.');

  // schemaPath
  const _path = pathList;
  if (_path[0] && isNumber(_path[0])) {
    _path.splice(0, 1);
  }
  const schemaPath = [...schemaIndex, _path].join('.');

  // console.log(path, rootPath, '-------', dataIndex, dataPath, schemaPath);

  return {
    dataIndex,
    dataPath,
    schemaPath
  };
};

export const getPath = (path: any) => {
  if (!path) {
    return null;
  }
  if (isArray(path)) {
    return path.join('.');
  }

  return path;
};

export const getLabel = (schema: any, displayType: string, widgets: any) => {
  const { title, description, descWidget, labelWidget } = schema;

  const LabelNode = widgets[labelWidget];

  if (LabelNode) {
    return <LabelNode schema={schema} />
  }

  if ((!description && !descWidget)) {
    return title;
  }

  const RenderDesc = () => {
    const Widget = widgets[descWidget];
    if (Widget) {
      return <Widget schema={schema} />;
    }

    if (description) {
      return (
        <span className='fr-desc ml2'>
          ({description})
        </span>
      )
    }
    return null;
  };

  if (displayType === 'inline') {
    return title;
  }

  return (
    <>
      {title}
      <RenderDesc />
    </>
  )
};

export const getTooltip = (schema: any, displayType: string) => {
  const { descType, description, tooltip } = schema;

  if (tooltip) {
    if (typeof tooltip === 'string') {
      return { title: <span dangerouslySetInnerHTML={{ __html: tooltip }} /> };
    }

    return {
      ...tooltip,
      title: <span dangerouslySetInnerHTML={{ __html: tooltip.title }} />,
    };
  }

  if (descType === 'widget' || !description) {
    return null;
  }

  if (displayType === 'column' && descType === 'icon') {
    return {
      title: description
    }
  }

  return null;
};

export const getExtraView = (extraKey: string, schema: any, widgets: any) => {
  const extra = schema[extraKey];
  if (!extra) {
    return;
  }

  // extra 自定义
  const widgetName = extra?.widget;
  if (widgetName) {
    const Widget = widgets[widgetName];
    if (!Widget) {
      return;
    }
    return <Widget schema={schema} />;
  }


  let __html = '';
  if (typeof extra === 'string') {
    __html = extra;
  }
  // 内部BU使用的口子，这个api不对外，也没有必要
  if (extra?.text) {
    __html = extra.text;
  }

  if (!__html) {
    return;
  }

  return (
    <div
      className='fr-form-item-extra'
      dangerouslySetInnerHTML={{ __html }}
    />
  )
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

  if (schema.cellSpan) {
    span = schema.cellSpan * span;
  }
  return span;
};

export const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string, isTop = true) => {
  if (isTop) {
    return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
  }
  return schema[valueKey] ?? upperCtx[valueKey];
};

export const getFieldProps = (widgetName: string, schema: any, { widgets, methods, form, dependValues, globalProps, path, rootPath }) => {
  const pathObj = getPathObj({ path, rootPath });
 
  const fieldProps = {
    ...schema.props,
    addons: {
      ...form,
      globalProps,
      dependValues,
      ...pathObj
    }
  };

  if (dependValues?.length > 0) {
    fieldProps.dependValues = dependValues;
  }

  ['placeholder', 'disabled', 'format', 'onStatusChange', 'className'].forEach(key => {
    if (schema[key]) {
      fieldProps[key] = schema[key];
    }
  });

  // 兼容 1.0 版本逻辑 enum => options
  if (schema.enum && !schema.props?.options) {
    const { enum: enums, enumNames } = schema;
    fieldProps.options = getArray(enums).map((item: any, index: number) => {
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
      fieldProps[key] = schema[key];
    }
  });

  // 支持 addonAfter 为自定义组件的情况
  if (isObject(fieldProps.addonAfter) && fieldProps.addonAfter.widget) {
    const AddonAfterWidget = widgets[fieldProps.addonAfter.widget];
    fieldProps.addonAfter = <AddonAfterWidget {...schema} />;
  }

  if (['treeSelect', 'number', 'multiSelect', 'select'].includes(widgetName)) {
    fieldProps.style = {
      width: '100%',
      ...fieldProps.style
    }
  }

  if (widgetName === 'multiSelect') {
    fieldProps.mode = 'multiple';
  }

  // Dynamic Mapping of Methods
  if (isObject(schema.methods)) {
    Object.keys(schema.methods).forEach(key => {
      const name = schema.methods[key];
      fieldProps[key] = methods[name];
    });
  }

  fieldProps.schema = schema;
  return fieldProps;
};
