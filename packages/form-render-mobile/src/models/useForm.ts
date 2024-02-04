import { useRef } from 'react';
import { Form } from 'antd-mobile';
import { isMatch, cloneDeep } from 'lodash-es';

import { transformFieldsData, getSchemaFullPath } from 'form-render/es/models/formCoreUtils';
import { parseBindToValues, parseValuesToBind } from 'form-render/es/models/bindValues';
import { flattenSchema as flatten } from 'form-render/es/models/flattenSchema';
import filterValuesUndefined from 'form-render/es/models/filterValuesUndefined';
import filterValuesHidden from 'form-render/es/models/filterValuesHidden';
import { _set, _get, _has, _merge, _mergeWith, isFunction, isObject, isArray, _isUndefined, valueRemoveUndefined, hasFuncProperty } from '../utils';

import type { FormInstance } from '../type';

const updateSchemaByPath = (_path: string, _newSchema: any, formSchema: any) => {
  const path = getSchemaFullPath(_path, formSchema);
  const currSchema = _get(formSchema, path, {});
  const newSchema = isFunction(_newSchema) ? _newSchema(currSchema) : _newSchema;

  const result = {
    ...currSchema,
    ...newSchema,
  }

  if (newSchema.props) {
    result.props = {
      ...currSchema?.props,
      ...newSchema.props
    }
  }
  
  _set(formSchema, path, result);
};

const getFieldName = (_path: any): any => {
  if (!_path) {
    return undefined;
  }

  if (typeof _path === 'boolean') {
    return _path;
  }

  let result: any[] = [];

  if (isArray(_path)) {
    result = _path.map((item: any) => {
      return item.split('.').map((ite: any) => {
        if (!isNaN(Number(ite))) {
          return ite * 1;
        }
        return ite;
      });
    });
  }

  result = _path.split('.').map((item: any) => {
    if (!isNaN(Number(item))) {
      return item * 1;
    }
    return item;
  });

  result = result.map(item => {
    if (typeof item === 'string' && item?.indexOf('[') === 0  && item?.indexOf(']') === item?.length -1) {
      return Number(item.substring(1, item.length-1));
    }
    return item;
  });
 
  return result;
};

const useForm = () => {
  const [form] = Form.useForm() as [FormInstance];
  const flattenSchemaRef = useRef({});
  const storeRef: any = useRef();
  const schemaRef = useRef({});
  const fieldRefs = useRef({});

  const { 
    getFieldError, 
    getFieldsError,
    setFields,
    isFieldsTouched,
    isFieldTouched,
    isFieldValidating,
    resetFields,
    validateFields,
    ...otherForm
  } = form;
  
  const xform: any = otherForm;


  const setStoreData = (data: any) => {
    const { setState } = storeRef.current;
    if (!setState) {
      setTimeout(() => {
        setState({ schema: schemaRef.current, flattenSchema: flattenSchemaRef.current });
      }, 0);
    }
    setState(data);
  };

  const handleSchemaUpdate = (newSchema: any) => {
    // form.__schema = Object.freeze(newSchema);
    flattenSchemaRef.current = flatten(newSchema) || {};
    schemaRef.current = newSchema;
    setStoreData({ schema: newSchema, flattenSchema: flattenSchemaRef.current });
  };

  xform.setSchema = (obj: any, cover = false) => {
    if (!isObject(obj)) {
      return;
    }

    if (cover) {
      handleSchemaUpdate(obj);
      return;
    }

    const schema = cloneDeep(schemaRef.current);
    Object.keys(obj || {}).forEach(path => {
      updateSchemaByPath(path, obj[path], schema);
    });

    handleSchemaUpdate(schema);
  }

  // 设置某个字段的协议
  xform.setSchemaByPath = (_path: string, _newSchema: any) => {
    // diff 判断是否需要更新，存在函数跳过
    if (!hasFuncProperty(_newSchema) && isMatch(_newSchema, xform.getSchemaByPath(_path))) {
      return;
    }

    const schema = cloneDeep(schemaRef.current);
    updateSchemaByPath(_path, _newSchema, schema);
    handleSchemaUpdate(schema);
  }

  // form.setSchemaByFullPath = (path: string, newSchema: any) => {
  //   const schema = _cloneDeep(schemaRef.current);
  //   const currSchema = _get(schema, path, {});

  //   const result = _mergeWith(currSchema, newSchema, (objValue, srcValue, key) => {
  //     return srcValue;
  //   });

  //   _set(schema, path, result);
  //   handleSchemaUpdate(schema);
  // }

  // 设置表单数据
  xform.setValues = (_values: any) => {
    const values = parseBindToValues(_values, flattenSchemaRef.current);
    form.setFieldsValue(values);
  }

  // 获取表单数据
  xform.getValues = (nameList?: any, filterFunc?: any) => {
    let values = cloneDeep(form.getFieldsValue(getFieldName(nameList), filterFunc));
    const { removeHiddenData } = storeRef.current?.getState() || {};
    if (removeHiddenData) {
      values = filterValuesHidden(values, flattenSchemaRef.current);
    }
    values = filterValuesUndefined(values);
    return parseValuesToBind(values, flattenSchemaRef.current);
  }

  xform.setValueByPath = (path: any, value: any) => {
    const name = getFieldName(path);
    form.setFieldValue(name, value);
  }

  xform.getValueByPath = (path: string) => {
    const name = getFieldName(path);
    return form.getFieldValue(name);
  }

  xform.getSchemaByPath = (_path: string) => {
    if (typeof _path !== 'string') {
      console.warn('请输入正确的路径');
    }
    const path = getSchemaFullPath(_path, schemaRef.current);
    return _get(schemaRef.current, path);
  };

  xform.getSchema = () => {
    return schemaRef.current;
  };

  // 设置一组字段错误
  xform.setErrorFields = (fieldsError: any[]) => {
    const fieldsData = transformFieldsData(fieldsError, getFieldName);
    if (!fieldsData) {
      return;
    }

    setFields(fieldsData);
  };

  // 清空某个字段的错误
  xform.removeErrorField = (path: any) => {
    setFields([{ name: getFieldName(path), errors: [] }]);
  };
  
  // 获取对应字段名的错误信息
  xform.getFieldError = (path: string) => {
    const name = getFieldName(path);
    return form.getFieldError(name);
  }

  // 获取一组字段名对应的错误信息，返回为数组形式
  xform.getFieldsError = (path: string[]) => {
    const name = getFieldName(path);
    return getFieldsError(name);
  }
  
  // 获取隐藏字段数据
  xform.getHiddenValues = () => {
    const values = xform.getValues();
    const allValues = xform.getValues(true);
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

  // 设置一组字段状态
  xform.setFields = (nameList: any[]) => {
    const fieldsData = transformFieldsData(nameList, getFieldName);
    if (!fieldsData) {
      return;
    }
    setFields(fieldsData);
  }

  // 检查一组字段是否被用户操作过，allTouched 为 true 时检查是否所有字段都被操作过
  xform.isFieldsTouched = (pathList?: string[], allTouched?: boolean) => {
    const nameList = (pathList || []).map(path => getFieldName(path));
    return isFieldsTouched(nameList, allTouched);
  }

  // 检查对应字段是否被用户操作过
  xform.isFieldTouched = (path: string) => {
    const name = getFieldName(path);
    return isFieldTouched(name);
  }

  // 检查对应字段是否被用户操作过
  xform.isFieldValidating = (path: string) => {
    const name = getFieldName(path);
    return isFieldValidating(name);
  }

  xform.resetFields = (pathList?: string[]) => {
    const nameList = (pathList || []).map(path => getFieldName(path));
    if (nameList.length > 0) {
      resetFields(nameList);
    } else {
      resetFields();
    }
  }

  // 触发表单验证
  xform.validateFields = (pathList?: string[]) => {
    const nameList = (pathList || []).map(path => getFieldName(path));
    if (nameList.length > 0) {
      return validateFields(nameList);
    }
    return validateFields();
  }

  // 获取扁平化 schema
  xform.getFlattenSchema = (path?: string) => {
    if (!path) {
      return flattenSchemaRef.current;
    }
    return flattenSchemaRef.current?.[path];
  }

  xform.__initStore = (store: any) => {
    storeRef.current = store;
  }

  xform.setFieldRef = (path: string, ref: any) => {
    if (!path) {
      return;
    }
    fieldRefs.current[path] = ref;
  }

  xform.getFieldRef = (path: string) => {
    return fieldRefs.current[path];
  }
 
  return xform;
};

export default useForm;
