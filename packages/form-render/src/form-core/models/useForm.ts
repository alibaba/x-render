import { Form, FormInstance } from 'antd';
import { set as _set, get as _get } from 'lodash-es';
import { transformFieldsError } from './common';

interface FormInstanceExtends extends FormInstance {
  init: any;
  schema: any;
  /** 设置表单值 */
  setValues: FormInstance['setFieldsValue'];
  /** 根据路径动态设置 Schema */
  setSchemaByPath: (path: string, schema: any) => any;
  getHiddenValues: () => any;
  /** 获取表单值 */
  getValues: FormInstance['getFieldsValue'];
  /** 设置 Schema */
  setSchema: (schema: any) => void;
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
}

const useForm = () => {
  const [form] = Form.useForm() as [FormInstanceExtends];

  /**初始化 */
  form.init = (schema: any, useStore: any) => {
    const { getState } = useStore;
    const { init, setSchemaByPath, setSchema } = getState();
    form.schema = schema;
    init(schema);
  
    form.setSchema = schema => {
      setSchema(schema, (newSchema: any) => {
        form.schema = newSchema;
      });
    };

    form.setSchemaByPath = (path: any, value: any) => setSchemaByPath(path, value, (newSchema: any) => {
      form.schema = newSchema;
    });
  };

  form.setValues = form.setFieldsValue;
  form.getValues = form.getFieldsValue;
  form.setValueByPath = form.setFieldValue;

  form.getSchemaByPath = path => {
    if (typeof path !== 'string') {
      console.warn('请输入正确的路径');
    }
    return _get(form.schema, 'properties.' + path, {});
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
