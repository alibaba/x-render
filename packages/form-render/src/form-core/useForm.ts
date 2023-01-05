import { Form, FormInstance } from 'antd';
import { set as _set, get as _get } from 'lodash-es';
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

  const [form] = Form.useForm() as [FormInstanceExtends];

  /**初始化 */
  form.init = (newSchema: any, useStore: any) => {
    const { getState } = useStore;
    const { init, setSchemaByPath, setSchema, schema } = getState();
    init(newSchema);

    form.setSchema = schema => {
      setSchema(schema);
    };

    form.setSchemaByPath = setSchemaByPath;

    form.getSchemaByPath = path => {
      if (typeof path !== 'string') {
        console.warn('请输入正确的路径');
      }
      return _get(schema, 'properties' + path, {});
    };
  };

  form.setValues = form.setFieldsValue;

  form.getValues = () => form.getFieldsValue(true);

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
