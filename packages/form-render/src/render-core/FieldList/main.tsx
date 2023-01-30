import React from 'react';
import { Form } from 'antd';
import { isFunction } from '../../utils';

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
};

const defaultAddBtnProps = {
  type: 'dashed',
  block: true,
  children: '新增一条',
};

const defaultDelConfirmProps = {
  title: '确定删除?',
  okText: '确定',
  cancelText: '取消',
};

let defaultActionColumnProps = {
  colHeaderText: '操作',
  copyText: '复制',
  delText: '删除',
};

export default (props: any) => {
  const { form, schema, path, parentLitPath, renderCore, rootPath, methods, widgets, upperCtx, formCtx } = props;
  
  const { widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgets[widgetName];

  const { props: listProps, ...otherSchema } = schema;

  let initialValue = schema.default;
  if (!initialValue && !['drawerList', 'list1'].includes(widgetName)) {
    initialValue = [{}]
  }

  let { 
    addBtnProps, delConfirmProps, actionColumnProps, 
    hideAdd, hideCopy, hideMove, hideDelete,
    onAdd, onRemove, onMove, onCopy,
    ...otherListProps
  } = listProps || {};

  const handleAdd = (add: any) => () => {
    let addFunc = onAdd;
    if (typeof onAdd === 'string') {
      addFunc = methods[onAdd];
    }

    if (isFunction(addFunc)) {
      addFunc(() => add(), { schema });
      return;
    }
    add();
  };

  const handleRemove = (remove: any) => (index: number) => { 
    let removeFunc = onRemove;
    if (typeof onRemove === 'string') {
      removeFunc = methods[onRemove];
    }

    if (isFunction(removeFunc)) {
      removeFunc(() => remove(index), { schema, index });
      return;
    }

    remove(index);
  };

  const handleMove = (move: any) => (form: number, to: number) => { 
    let moveFunc = onMove;
    if (typeof moveFunc === 'string') {
      moveFunc = methods[onMove];
    }

    if (isFunction(moveFunc)) {
      moveFunc(() => move(form, to), { schema,  form, to });
      return;
    }

    move(form, to);
  };

  const handleCopy = (add: any) => (value: any) => {
    let copyFunc = onCopy;
    if (typeof onAdd === 'string') {
      copyFunc = methods[onAdd];
    }

    if (isFunction(copyFunc)) {
      copyFunc(() => add(value), { schema });
      return;
    }
    add(value);
  };

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  const readOnly = getValueFromKey('readOnly');
  const preRootPath = (rootPath || []).splice(0, rootPath.length - 1);

  if (hideAdd) {
    hideCopy = true;
  }

  if (readOnly) {
    hideAdd = true;
    hideCopy = true;
    hideDelete = true;
    hideMove = true;
  }
 
  return (
    <Form.List name={path} initialValue={initialValue}>
      {(fields, operation) => (
        <Widget
          {...otherListProps}
          form={form}
          schema={otherSchema}
          fields={fields}
          operation={operation}

          path={path}
          listName={path}
          parentLitPath={parentLitPath}
          rootPath={[...preRootPath, path]}
          
          readOnly={readOnly}
          methods={methods}
          renderCore={renderCore}
          widgets={widgets}

          hideAdd={hideAdd}
          hideCopy={hideCopy}
          hideDelete={hideDelete}
          hideMove={hideMove}

          addItem={handleAdd(operation.add)}
          removeItem={handleRemove(operation.remove)}
          moveItem={handleMove(operation.move)}
          copyItem={handleCopy(operation.add)}

          addBtnProps= {{
            ...defaultAddBtnProps,
            ...addBtnProps
          }}
          delConfirmProps={{
            ...defaultDelConfirmProps,
            ...delConfirmProps
          }}
          actionColumnProps={{
            ...defaultActionColumnProps,
            ...actionColumnProps
          }}
        />
      )}
    </Form.List>
  )
}