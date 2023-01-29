import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand'
import { FRContext } from '../../models/context';
import { isFunction } from '../../utils';

const UpperContext = createContext(() => {});

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
  const store = useContext(FRContext);

  const formCtx: any = useStore(store, (state: any) => state.context);
  const methods = useStore(store, (state: any) => state.methods);

  const upperCtx: any = useContext(UpperContext);

  const widgets = useStore(store, (state: any) => state.widgets)

  const { displayType } = formCtx;
  const isDisplayColumn = displayType === 'column';
  const { schema, path, parentLitPath, renderCore, max, rootPath } = props;
  const { display } = schema;
  
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgets[widgetName];

  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }

  const listProps = schema?.props || {};
  let { 
    addBtnProps, delConfirmProps, actionColumnProps, 
    hideAdd, hideCopy, hideMove, hideDelete,
    onAdd, onRemove, onMove, onCopy
  } = listProps;


  const form = Form.useFormInstance();
  const value = Form.useWatch(path, form);

  const handleOnAdd = (add: any) => () => {
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

  const handleOnRemove = (remove: any) => (index: number) => { 
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

  const handleOnMove = (move: any) => (form: number, to: number) => { 
    let moveFunc = onMove;
    if (typeof moveFunc === 'string') {
      moveFunc = methods[onMove];
    }
    debugger;

    if (isFunction(moveFunc)) {
      moveFunc(() => move(form, to), { schema,  form, to });
      return;
    }

    move(form, to);
  };

  const handleOnCopy = (add: any) => (value: any) => {
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

  const labelCol = getValueFromKey('labelCol');
  const readyOnly = getValueFromKey('readyOnly');
  const preRootPath = (rootPath || []).splice(0, rootPath.length - 1);

  let isInline = display === 'inline';
  if (!value) {
    isInline = true;
  }


  

  if (hideAdd) {
    hideCopy = true;
  }

  if (readyOnly) {
    hideAdd = true;
    hideCopy = true;
    hideDelete = true;
    hideMove = true;
  }

  return (
    <Col span={24}>
      {!isInline && !isDisplayColumn && (
        <Form.Item 
          label={label}
          labelAlign={'left'}
          colon={false}
          style={{ marginBottom: 0 }}
        >
        </Form.Item>
      )}
      <Form.Item label={label} wrapperCol={{ flex: 1 }} labelCol={labelCol} noStyle={!isInline} >
        <Widget
          name={path}
          form={form}
          schema={{
            ...schema,
            props: {
              ...schema?.props,
              addBtnProps: {
                ...defaultAddBtnProps,
                ...addBtnProps
              },
              delConfirmProps: {
                ...defaultDelConfirmProps,
                ...delConfirmProps
              },
              actionColumnProps: {
                ...defaultActionColumnProps,
                ...actionColumnProps
              },
              hideAdd,
              hideCopy,
              hideDelete,
              hideMove,
              addItem: handleOnAdd,
              removeItem: handleOnRemove,
              moveItem: handleOnMove,
              copyItem: handleOnCopy
            }
          }}
          parentLitPath={parentLitPath}
          rootPath={preRootPath}
          readyOnly={readyOnly}
          methods={methods}
          renderCore={renderCore}
        />
      </Form.Item>
    </Col>
  );
}