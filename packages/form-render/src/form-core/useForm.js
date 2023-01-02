import { Form, FormInstance } from 'antd';
import { isEmpty, set as _set, get as _get, cloneDeep } from 'lodash-es';
import { useEffect } from 'react';
import create from 'zustand';

export const useStore = create((set, get) => ({
  schema: {},
  // form: {},
  init: schema => {
    return set({ schema });
  },
  setSchema: schema => {
    return set({ schema });
  },
  setSchemaByPath: (path, modifiedSchema) => {
    const newSchema = cloneDeep(get().schema);
    let itemSchema = _get(newSchema, path, {});
    console.log('itemSchema', itemSchema);
    console.log('path', path);
    itemSchema = { ...itemSchema, ...modifiedSchema };
    _set(newSchema, path, itemSchema);
    return set({ schema: newSchema });
  },
}));

const useForm = () => {
  const { getState } = useStore;
  const [form] = Form.useForm();
  const { init, setSchemaByPath } = getState();

  form.init = schema => {
    init(schema);
  };
  form.setValues = form.setFieldsValue;
  form.setSchemaByPath = setSchemaByPath;

  // form = {
  //   ...form,
  //   // state
  //   // schema: schemaRef.current,
  //   // flatten: finalFlatten,
  //   // touchedKeys: _touchedKeys.current,
  //   // allTouched,
  //   // methods
  //   // touchKey,
  //   // removeTouched,
  //   // changeTouchedKeys,
  //   getValues: form.getFieldValue,
  //   onItemChange,
  //   setValueByPath: onItemChange, // 单个
  //   getSchemaByPath,
  //   setSchemaByPath,
  //   setSchema,
  //   setValues,
  //   getValues,
  //   getHiddenValues,
  //   // resetFields,
  //   // submit,
  //   // init: submit, // 简版的迁移方案里用，正常用不到，换个名字迁移的时候大家更好接受点
  //   // submitData,
  //   errorFields: () => form.getFieldErrorFields(),
  //   isValidating: () => form.isFieldsValidating(),
  //   outsideValidating,
  //   // isSubmitting, // 内部状态，外部不要用
  //   // endValidating,
  //   // endSubmitting,
  //   // setErrorFields,   // 自创API
  //   // removeErrorField, // 自创API
  //   // firstMount, // 内部维护的状态
  //   // setFirstMount, // 内部维护的状态
  //   // logs
  //   logOnMount,
  //   logOnSubmit,
  //   // inner api, DON'T USE
  // };

  return form;
};

export { useForm };
