import React, { useContext } from 'react';
import { Form } from 'antd';

import { _get } from '../../utils';
import { FRContext } from '../../models/context';
import { isHasExpression, parseAllExpression } from '../../models/expression';
import Main from './main';

export default (props: any) => {
  const { schema, rootPath, ...otherProps } = props;

  const store = useContext(FRContext);
  const { schema: formSchema } = store.getState();

  // No function expressions exist
  if (!isHasExpression(schema) && !schema?.dependencies) {
    return <Main {...props} store={store} />;
  }

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
  const getDependValues = (formData: any, dependPath: string) => {
    const indexReg =/\[[0-9]*\]/;

    if (indexReg.test(dependPath)) {
      const currentIndex = _get(otherProps, 'path.0')
      const dependIndex = dependPath
        .match(indexReg)[0]
        .replace('[', '')
        .replace(']', '')

      const listPath = dependPath.split(indexReg)[0];
      const itemIndex = dependIndex || currentIndex;
      const itemPath = dependPath.replace(`${listPath}[${dependIndex}].`, '')
      const listData = _get(formData, `${listPath}[${itemIndex}]`)

      return getDependValues(listData,itemPath);
    }

    return _get(formData, dependPath);
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
        const dependValues = (schema.dependencies || []).map((dep: string) => getDependValues(formData, dep));
        const newSchema = parseAllExpression(schema, formData, rootPath, formSchema);

        return <Main schema={newSchema} rootPath={rootPath} {...otherProps} dependValues={dependValues} store={store} />;
      }}
    </Form.Item>
  );
}
