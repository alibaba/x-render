import React, { useContext } from 'react';
import { Form } from 'antd';

import { _get } from '../../utils';
import { getDependValues } from './module';
import { FRContext, ConfigContext } from '../../models/context';
import { isHasExpression, parseAllExpression } from '../../models/expression';
import Main from './main';

export default (props: any) => {
  const { schema, rootPath, ...otherProps } = props;

  const store = useContext(FRContext);
  const { schema: formSchema } = store.getState();

  const configCtx = useContext(ConfigContext);
  const mustacheDisabled = configCtx?.globalConfig?.mustacheDisabled;
  const dependencies = schema?.dependencies;

  // No function expressions exist
  if ((!isHasExpression(schema) && !mustacheDisabled) && (!dependencies || !dependencies?.length)) {
    return <Main {...props} store={store} configCtx={configCtx} />;
  }

  // Need to listen to form values for dynamic rendering
  return (
    <Form.Item
      noStyle
      shouldUpdate={() => {
        // TODO 进行优化
        return true;
      }}
    >
      {(form: any) => {
        const formData = form.getFieldsValue(true);

        const formDependencies: any[] = [];
        const dependValues = (dependencies || []).map((depPath: string) => {
          const item:any[] = [];
          formDependencies.push(item);
          return getDependValues(formData, depPath, props, item);
        });
        const newSchema = mustacheDisabled ? schema : parseAllExpression(schema, formData, rootPath, formSchema);

        return (
          <Main 
            schema={{
              ...newSchema,
              dependencies: formDependencies
            }} 
            rootPath={rootPath} 
            {...otherProps}
            dependValues={dependValues} 
            store={store} 
            configCtx={configCtx} 
          />
        );
      }}
    </Form.Item>
  );
}
