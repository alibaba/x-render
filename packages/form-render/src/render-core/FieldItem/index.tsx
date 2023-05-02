import React, { useContext } from 'react';
import { Form } from 'antd';

import { _get } from '../../utils';
import { FRContext, ConfigContext } from '../../models/context';
import { isHasExpression, parseAllExpression } from '../../models/expression';
import Main from './main';

/*
   * Get depend values
   *
   * 1. normal path
   * Just get value of path in formData
   *
   * 2. list path
   * Like `list[].foo`.`[]` means the same index as the current item.
   * You can pass `[index]` to get specific item at the index of list, such as `list[1].foo`.
   * Support more complex path like `list[].foo[].bar`
   */
const getDependValues = (formData: any, dependPath: string, props: any, dependencieItem: any[]) => {
  const indexReg =/\[[0-9]*\]/;

  if (indexReg.test(dependPath)) {
    const currentIndex = _get(props, 'path.0')
    const dependIndex = dependPath
      .match(indexReg)[0]
      .replace('[', '')
      .replace(']', '')

    const listPath = dependPath.split(indexReg)[0];
    const itemIndex = dependIndex || currentIndex;
    const itemPath = dependPath.replace(`${listPath}[${dependIndex}].`, '')
    const listData = _get(formData, `${listPath}[${itemIndex}]`);

    dependencieItem.push(listPath, itemIndex);

    return getDependValues(listData, itemPath, props, dependencieItem);
  }

  dependencieItem.push(...dependPath.split('.'));

  return _get(formData, dependPath);
}


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
