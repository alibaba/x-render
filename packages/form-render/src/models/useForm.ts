import { useRef, useState } from 'react';
import { Form, FormInstance } from 'antd';

import { transformFieldsError, getSchemaFullPath } from './formCoreUtils';
import { transformValueBind, parseValuesWithBind } from './bindValues';
import { _set, _get, _has, _cloneDeep, _merge, isFunction, isObject, isArray, _omitBy, _isUndefined } from '../utils';
import { flattenSchema as flatten } from './flattenSchema';


interface FormInstanceExtends extends FormInstance {
  init: any;
  __schema: any;
  __setStore: (data: any) => any;
  /** 设置表单值 */
  setValues: FormInstance['setFieldsValue'];
  setSchemaByFullPath: (path: string, schema: any) => any;
  /** 根据路径动态设置 Schema */
  setSchemaByPath: (path: string, schema: any) => any;
  getHiddenValues: () => any;
  /** 获取表单值 */
  getValues: FormInstance['getFieldsValue'];
  /** 设置 Schema */
  setSchema: (schema: any, cover: boolean) => void;
  /** 根据路径修改表单值 */
  setValueByPath: FormInstance['setFieldValue'];
  /**
   * @deprecated 即将弃用，请勿使用此api，使用setValueByPath
   */
  onItemChange: FormInstance['setFieldValue'];
  /** 根据路径获取 Schema */
  getSchemaByPath: (path: string) => any;
  setErrorFields: (erros: any[]) => void;
  removeErrorField: (path: string) => any;
  errorFields: FormInstance['getFieldsError'];
  /**
   * @deprecated 即将弃用，请勿使用此api，使用 form.isFieldsValidating
   */
  scrollToPath: FormInstance['scrollToField']
};

const updateSchemaByPath = (_path: string, _newSchema: any, formSchema: any) => {
  const path = getSchemaFullPath(_path, formSchema);
  const currSchema = _get(formSchema, path, {});
  const newSchema = isFunction(_newSchema) ? _newSchema(currSchema) : _newSchema;

  const result = _merge(currSchema, newSchema);
  _set(formSchema, path, result);
};



const useForm = () => {
  const [form] = Form.useForm() as [FormInstanceExtends];
  const flattenSchemaRef = useRef({});
  const storeRef: any = useRef();
  const schemaRef = useRef({});

  const setStoreData = (data: any) => {
    const { setState } = storeRef.current;
    if (!setState) {
      setTimeout(() => {
        setState({ schema: schemaRef.current, flattenSchema: flattenSchemaRef.current });
      }, 0)
    }
    setState(data);
  };

  const handleSchemaUpdate = (newSchema: any) => {
    // form.__schema = Object.freeze(newSchema);
    flattenSchemaRef.current = flatten(newSchema) || {};
    schemaRef.current = newSchema;
    setStoreData({ schema: newSchema, flattenSchema: flattenSchemaRef.current });
  };

  form.setSchema = (obj: any, cover: boolean) => {
    if (!isObject(obj)) {
      return;
    }

    if (cover) {
      handleSchemaUpdate(obj);
      return;
    }

    const schema = _cloneDeep(schemaRef.current);
    Object.keys(obj || {}).forEach(path => {
      updateSchemaByPath(path, obj[path], schema);
    });

    handleSchemaUpdate(schema);
  }

  form.setSchemaByPath = (_path: string, _newSchema: any) => {
    const schema = _cloneDeep(schemaRef.current);
    updateSchemaByPath(_path, _newSchema, schema);
   
    handleSchemaUpdate(schema);
  }

  form.setSchemaByFullPath = (path: string, newSchema: any) => {
    const schema = _cloneDeep(schemaRef.current);
    const currSchema = _get(schema, path, {});
    const result = _merge(newSchema, currSchema);

    _set(schema, path, result);
    handleSchemaUpdate(schema);
  }

  form.setValues = (_values: any) => {
    const values = transformValueBind(_values, flattenSchemaRef.current);
    form.setFieldsValue(values);
  }

  form.getValues = (nameList?: any, filterFunc?: any) => {
    let values = form.getFieldsValue(nameList, filterFunc);
    values = _omitBy(values, _isUndefined);
    return parseValuesWithBind(values, flattenSchemaRef.current);
  }

  form.setValueByPath = form.setFieldValue;

  form.getSchemaByPath = _path => {
    if (typeof _path !== 'string') {
      console.warn('请输入正确的路径');
    }
    const path = getSchemaFullPath(_path, schemaRef.current);
    return _get(schemaRef.current, path);
  };

  form.setErrorFields = (_fieldsError: any[]) => {
    const fieldsError = transformFieldsError(_fieldsError);
    if (!fieldsError) {
      return;
    }
    form.setFields(fieldsError);
  };

  form.removeErrorField = (path: any) => {
    form.setFields([{ name: path, errors: []}]);
  };

  form.getHiddenValues = () => {
    const values = form.getFieldsValue();
    const allValues = form.getFieldsValue(true);
    const hiddenValues = {};

    const recursion = (obj1: any, obj2: any, path: any) => {
      Object.keys(obj1).forEach((key: string) => {
        const value = obj1[key];
        const _path = path ? `${path}.${key}` : key;
        if (!obj2.hasOwnProperty(key)) {
          _set(hiddenValues, _path, value);
          return;
        } 

        if (isObject(value)) {
          recursion(value, obj2[key], _path);
        }

        if (isArray(value)) {
          value.map((item: any, index: number) => {
            recursion(item, _get(obj2, `${key}[${index}]`, []), `${_path}[${index}]`)
          });
        }
      });
    };

    recursion(allValues, values, null);
    return hiddenValues;
  }

  form.__setStore = (store: any) => {
    storeRef.current = store;
  }

  // 老 API 兼容
  form.scrollToPath = form.scrollToField;
  form.onItemChange = form.setFieldValue;
  // form = {
  //   // touchedKeys: _touchedKeys.current,
  //   // allTouched,
  //   // methods
  //   // touchKey,
  //   // removeTouched,
  //   // changeTouchedKeys,
  // };
  return form;
};

export default useForm ;