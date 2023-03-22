import { useRef } from 'react';
import { Form } from 'antd';

import { transformFieldsError, getSchemaFullPath } from './formCoreUtils';
import { parseBindToValues, parseValuesToBind } from './bindValues';
import { _set, _get, _has, _cloneDeep, _merge, isFunction, isObject, isArray, _isUndefined, valueRemoveUndefined } from '../utils';
import { flattenSchema as flatten } from './flattenSchema';
import type { FormInstance } from '../type';

const updateSchemaByPath = (_path: string, _newSchema: any, formSchema: any) => {
  const path = getSchemaFullPath(_path, formSchema);
  const currSchema = _get(formSchema, path, {});
  const newSchema = isFunction(_newSchema) ? _newSchema(currSchema) : _newSchema;

  const result = _merge(currSchema, newSchema);
  _set(formSchema, path, result);
};

const getFieldPath = (_path: any) => {
  if (!_path) {
    return undefined;
  }

  if (typeof _path === 'boolean') {
    return _path
  }

  if (isArray(_path)) {
    return _path.map(item => {
      return item.split('.').map((ite: any) => {
        if (!isNaN(Number(ite))) {
          return ite * 1;
        }
        return ite;
      });
    })
  }
  return _path.split('.').map((item: any) => {
    if (!isNaN(Number(item))) {
      return item * 1;
    }
    return item;
  });
};

const useForm = () => {
  const [form] = Form.useForm() as [FormInstance];
  const flattenSchemaRef = useRef({});
  const storeRef: any = useRef();
  const schemaRef = useRef({});
  const { getFieldError, getFieldsError, getFieldInstance } = form;
  const formRef = useRef({
    getFieldError,
    getFieldsError,
    getFieldInstance
  });

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

  form.setSchema = (obj: any, cover = false) => {
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
    const values = parseBindToValues(_values, flattenSchemaRef.current);
    form.setFieldsValue(values);
  }

  form.getValues = (nameList?: any, filterFunc?: any) => {
    let values = form.getFieldsValue(getFieldPath(nameList), filterFunc);
    values = valueRemoveUndefined(values);
    return parseValuesToBind(values, flattenSchemaRef.current);
  }

  form.setValueByPath = (path: any, value: any) => {
    const name = getFieldPath(path);
    form.setFieldValue(name, value);
  }

  form.getSchemaByPath = _path => {
    if (typeof _path !== 'string') {
      console.warn('请输入正确的路径');
    }
    const path = getSchemaFullPath(_path, schemaRef.current);
    return _get(schemaRef.current, path);
  };

  form.getSchema = () => {
    return schemaRef.current;
  };

  form.setErrorFields = (_fieldsError: any[]) => {
    const fieldsError = transformFieldsError(_fieldsError);
    if (!fieldsError) {
      return;
    }
    form.setFields(fieldsError);
  };

  form.removeErrorField = (path: any) => {
    form.setFields([{ name: getFieldPath(path), errors: [] }]);
  };

  form.getFieldError = (path: string) => {
    const name = getFieldPath(path);
    return formRef.current.getFieldError(name);
  }

  form.getFieldsError = (path: string[]) => {
    const name = getFieldPath(path);
    return formRef.current.getFieldsError(name);
  }

  form.getFieldInstance = (path) => {
    const name = getFieldPath(path)
    return formRef.current.getFieldInstance(name);
  }

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

  form.__initStore = (store: any) => {
    storeRef.current = store;
  }

  form.scrollToPath = form.scrollToField;
  // 老 API 兼容
  form.onItemChange = form.setValueByPath;
 
  return form;
};

export default useForm;
