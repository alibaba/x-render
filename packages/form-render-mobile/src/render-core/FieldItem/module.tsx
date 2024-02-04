import React from 'react';
import { _get, isObject, getArray, isArray, isNumber } from '../../utils';

// return dataIndex、dataPath、schemaPath
const getPathObj = ({ rootPath = [], path }) => {

  const pathList = (path || '').split('.');
  const dataIndex: any[] = [];
  const schemaIndex: any[] = [];
  const dataPathList: any[] = [];

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
  let list: any[] = [...rootPath];
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

export const getLabel = (schema: any, displayType: string, widgets: any, addons: any) => {
  const { title, description, descWidget, labelWidget } = schema;

  const LabelNode = widgets[labelWidget];

  if (LabelNode) {
    return <LabelNode schema={schema} addons={addons} />
  }

  if ((!description && !descWidget)) {
    return title;
  }

  const RenderDesc = () => {
    const Widget = widgets[descWidget];
    if (Widget) {
      return <Widget schema={schema} addons={addons} />;
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


export const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string, isTop = true) => {
  if (isTop) {
    return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
  }
  return schema[valueKey] ?? upperCtx[valueKey];
};

export const getFieldProps = (schema: any, { widgets, methods, form, dependValues, globalProps, path, rootPath, fieldRef }) => {
  const pathObj = getPathObj({ path, rootPath });
 
  const fieldProps = {
    ...schema.props,
    addons: {
      ...form,
      globalProps,
      dependValues,
      fieldRef,
      ...pathObj
    }
  };

  if (dependValues?.length > 0) {
    fieldProps.dependValues = dependValues;
  }

  ['placeholder', 'disabled', 'format', 'className'].forEach(key => {
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


/*
   * Get depend values
   *
   * 1. normal path
   * Just get value of path in formData
   *
   * 2. list path
   * Like `list[].foo`.`[]` means the same index as the current item.
   * You can pass `[index]` to get specific item at the index of list, such as `list[1].foo`.
   * Support more complex path like `list[].foo[].bar`
   */
export const getDependValues = (formData: any, dependPath: string, props: any, dependencieItem: any[]) => {
  const indexReg =/\[[0-9]*\]/;

  if (indexReg.test(dependPath)) {
    const currentIndex = _get(props, 'path.0')
    const dependIndex = dependPath
      .match(indexReg)[0]
      .replace('[', '')
      .replace(']', '')

    const listPath = dependPath.split(indexReg)[0];
    const itemIndex = dependIndex || currentIndex;
    const itemPath = dependPath.replace(`${listPath}[${dependIndex}].`, '')
    const listData = _get(formData, `${listPath}[${itemIndex}]`);

    dependencieItem.push(listPath, itemIndex);

    return getDependValues(listData, itemPath, props, dependencieItem);
  }

  dependencieItem.push(...dependPath.split('.'));

  return _get(formData, dependPath);
}
