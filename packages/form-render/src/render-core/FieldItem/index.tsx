import React, { useContext } from 'react';
import { Form } from 'antd';

import { _get } from '../../utils';
import { getDependValues } from './module';
import { FRContext, ConfigContext } from '../../models/context';
import { isHasExpression, parseAllExpression } from '../../models/expression';
import fieldShouldUpdate from '../../models/fieldShouldUpdate';
import Main from './main';

export default (props: any) => {
  const { schema, rootPath, ...restProps } = props;

  const store: any = useContext(FRContext);
  const { schema: formSchema } = store.getState();

  const configCtx: any = useContext(ConfigContext);
  const mustacheDisabled = configCtx?.globalConfig?.mustacheDisabled;
  const shouldUpdateOpen = configCtx?.globalConfig?.shouldUpdateOpen;

  const dependencies = schema?.dependencies;

  // No function expressions exist
  if ((!isHasExpression(schema) && !mustacheDisabled) && (!dependencies || !dependencies?.length)) {
    return <Main {...props} store={store} configCtx={configCtx} />;
  }

  const schemaStr = JSON.stringify(schema);
  // Need to listen to form values for dynamic rendering
  return (
    <Form.Item
      noStyle
      shouldUpdate={fieldShouldUpdate(schemaStr, rootPath, dependencies, shouldUpdateOpen)}
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
            {...restProps}
            dependValues={dependValues} 
            store={store} 
            configCtx={configCtx} 
          />
        );
      }}
    </Form.Item>
  );
}
