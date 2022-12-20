import { Form } from 'antd';
import create from 'zustand';

const useForm = () => {
  const [form] = Form.useForm();

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
