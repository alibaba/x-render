import React, { useContext } from 'react';
import { Form } from 'antd';

import { _get } from '../../utils';
import { FRContext } from '../../models/context';
import { isHasExpression, parseAllExpression } from '../../models/expression';
import Field from './field';

export default (props: any) => {
  const { schema, rootPath, ...otherProps } = props;

  const store = useContext(FRContext);
  const { schema: formSchema } = store.getState();

  // No function expressions exist
  if (!isHasExpression(schema) && !schema?.dependencies) {
    return <Field {...props} store={store} />;
  }

  // Need to listen to form values for dynamic rendering
  return (
    <Form.Item
      noStyle
      //dependencies={schema.dependencies}
      shouldUpdate={(prevValues, curValues) => {
        // Observe whether the value of a function expression dependency has changed
        // TODO 进行优化
        return true;
      }}
    >
      {(form: any) => {
        const formData = form.getFieldsValue(true);
        const dependValues = (schema.dependencies || []).map((item: any) => _get(formData, item))
        const newSchema = parseAllExpression(schema, formData, rootPath, formSchema);
        
        return <Field schema={newSchema} {...otherProps} dependValues={dependValues} store={store} />;
      }}
    </Form.Item>
  );
}