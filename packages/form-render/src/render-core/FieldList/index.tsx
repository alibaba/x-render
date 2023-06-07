import React, { useContext } from 'react';
import { Form } from 'antd';

import { _get } from '../../utils';
import { FRContext, ConfigContext } from '../../models/context';
import { isHasExpression } from '../../models/expression';
import fieldShouldUpdate from '../../models/fieldShouldUpdate';
import Main from './main';

export default (props: any) => {
  const { schema, rootPath } = props;

  const configCtx = useContext(ConfigContext);
  const mustacheDisabled = configCtx?.globalConfig?.mustacheDisabled;
  const dependencies = schema?.dependencies;

  // No function expressions exist
  if ((!isHasExpression(schema) && !mustacheDisabled) && (!dependencies || !dependencies?.length)) {
    return <Main configContext={configCtx} {...props}  />;
  }

  const schemaStr = JSON.stringify(schema);
  // Need to listen to form values for dynamic rendering
  return (
    <Form.Item
      noStyle
      shouldUpdate={fieldShouldUpdate(schemaStr, rootPath, dependencies, true)}
    >
      {(form: any) => {
        // const formData = form.getFieldsValue(true);
        // const formDependencies: any[] = [];
        // const dependValues = (dependencies || []).map((depPath: string) => {
        //   const item:any[] = [];
        //   formDependencies.push(item);
        //   return getDependValues(formData, depPath, props, item);
        // });
        // const newSchema = mustacheDisabled ? schema : parseAllExpression(schema, formData, rootPath, formSchema);
       
        return <Main configContext={configCtx} {...props}  />;
      }}
    </Form.Item>
  );
}
