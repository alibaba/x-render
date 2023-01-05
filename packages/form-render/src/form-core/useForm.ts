import { Form, FormInstance } from 'antd';
import { isEmpty, set as _set, get as _get, cloneDeep } from 'lodash-es';
import { useEffect } from 'react';
import create from 'zustand';

type FormStore = {
  schema?: any;
  init?: (schema: FormStore['schema']) => any;
  setSchema: (schema: any) => any;
  setSchemaByPath: (path: string, schema: any) => any;
};

export const useStore = create<FormStore>((set, get) => ({
  schema: {},
  init: schema => {
    return set({ schema });
  },
  setSchema: schema => {
    return set({ schema });
  },
  setSchemaByPath: (path, modifiedSchema) => {
    const newSchema = cloneDeep(get().schema);
    let itemSchema = _get(newSchema, path, {});
    // console.log('itemSchema', itemSchema);
    // console.log('path', path);
    itemSchema = { ...itemSchema, ...modifiedSchema };
    // 需要改善
    _set(newSchema, 'properties.' + path, itemSchema);
    return set({ schema: newSchema });
  },
}));

interface FormInstanceExtends extends FormInstance {
  init: any;
  /** 设置表单值 */
  setValues: FormInstance['setFieldValue'];
  /** 根据路径动态设置 Schema */
  setSchemaByPath: (path: string, schema: any) => any;
  getHiddenValues: () => any;
  /** 获取表单值 */
  getValues: any;
  /** 设置 Schema */
  setSchema: (schema: any) => void;
  /** 根据路径修改表单值 */
  setValueByPath: (path: string, value: unknown) => void;
  /**
   * @deprecated 即将弃用，请勿使用此api，使用setValueByPath
   */
  onItemChange: (path: string, value: unknown) => void;
  /** 根据路径获取 Schema */
  getSchemaByPath: (path: string) => any;
  errorFields: FormInstance['getFieldsError'];
  /**
   * @deprecated 即将弃用，请勿使用此api，使用 form.isFieldsValidating
   */
  isValidating: FormInstance['isFieldsValidating'];
}

const useForm = () => {
  const { getState } = useStore;
  const [form] = Form.useForm() as [FormInstanceExtends];
  const { init, setSchemaByPath, setSchema, schema } = getState();

  /**初始化 */
  form.init = schema => {
    init(schema);
  };
  form.setSchema = schema => {
    setSchema(schema);
  };
  form.setValues = form.setFieldsValue;
  form.setSchemaByPath = setSchemaByPath;
  form.getValues = () => form.getFieldsValue(true);
  form.getSchemaByPath = path => {
    if (typeof path !== 'string') {
      console.warn('请输入正确的路径');
    }
    return _get(schema, 'properties' + path, {});
  };
  form.setValueByPath = (path, value) => {
    const _path = 'properties' + path;
    form.setFieldValue(_path, value);
  };
  form.onItemChange = form.setValueByPath;
  form.errorFields = form.getFieldsError;
  form.isValidating = form.isFieldsValidating;


  // form = {
  //   // touchedKeys: _touchedKeys.current,
  //   // allTouched,
  //   // methods
  //   // touchKey,
  //   // removeTouched,
  //   // changeTouchedKeys,
  //   // setErrorFields,   // 自创API
  //   // removeErrorField, // 自创API
  // };

  return form;
};

export { useForm };
