import React, { useContext, useEffect, useMemo } from 'react';
import { Form, message, ConfigProvider, Button } from 'antd';
import { isFunction, translation } from '../../utils';
import { getWidget } from '../../models/mapping';
import { transformRules } from '../../models/validates';
import { getParamValue } from './modules';

export default (props: any) => {
  const {
    form,
    schema,
    path,
    parentLitPath,
    renderCore,
    rootPath,
    methods,
    upperCtx,
    formCtx,
    configContext,
    setListData
  } = props;
 
  const { widgets, globalConfig } = configContext;
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const defaultAddBtnProps = {
    type: 'dashed',
    block: true,
    children: t('add_item'),
  };

  const defaultDelConfirmProps = {
    title: t('confirm_delete'),
    okText: t('confirm'),
    cancelText: t('cancel'),
  };

  let defaultActionColumnProps = {
    colHeaderText: t('operate')
  };

  let widgetName = schema.widget || 'cardList';
  const Widget = getWidget(widgetName, widgets);
  const { props: listProps, removeBtn, rules = [], ...otherSchema } = schema;
  
  let {
    addBtnProps,
    delConfirmProps,
    actionColumnProps,
    hideAdd,
    hideCopy,
    hideMove,
    hideDelete,
    onAdd,
    onRemove,
    onMove,
    onCopy,
    ...otherListProps
  } = listProps || {};

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  const readOnly = getValueFromKey('readOnly');
  const preRootPath = [...(rootPath || [])].splice(0, rootPath.length - 1);
  const displayType = getValueFromKey('displayType');

  if (hideMove === undefined && globalConfig?.listOperate?.hideMove) {
    hideMove = globalConfig?.listOperate.hideMove;
  }

  const listData = form.getFieldValue([...preRootPath, ...path]) || [];
  if (otherSchema?.min > 0 && listData.length <= otherSchema?.min) {
    hideDelete = true;
  }
 
  if (otherSchema?.max > 0 && otherSchema?.max <= listData.length) {
    hideAdd = true;
  }

  if (hideAdd) {
    hideCopy = true;
  }

  if (readOnly) {
    hideAdd = true;
    hideCopy = true;
    hideDelete = true;
    hideMove = true;
  }

  const defaultValue = useMemo(() => {
    let result = schema.default ?? schema.defaultValue;
    if (result === undefined) {
      result = form.getFieldValue([...preRootPath, ...path]);
      if (!result && !['drawerList', 'list1'].includes(widgetName)) {
        result = [{}];
      }
    }
    return result;
  }, []);

  useEffect(() => {
    setListData(defaultValue || []);
  }, []);

  const handleAdd = (add: any) => (data?: any) => {
    let addFunc = onAdd;
    if (typeof onAdd === 'string') {
      addFunc = methods[onAdd];
    }

    if (isFunction(addFunc)) {
      addFunc((funData?: any) => add(funData || data), { schema, data });
      return;
    }
    add(data);
  };

  const handleRemove = (remove: any) => (index: number) => {
    let removeFunc = onRemove;
    if (typeof onRemove === 'string') {
      removeFunc = methods[onRemove];
    }

    if (isFunction(removeFunc)) {
      const data = form.getFieldValue([...preRootPath, ...path, index]);
      removeFunc(() => remove(index), { schema, index, data });
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
      moveFunc(() => move(form, to), { schema, form, to });
      return;
    }

    move(form, to);
  };

  const handleCopy = (add: any, fields: any) => (data: any) => {
    if (schema.max && fields.length === schema.max) {
      return message.warning(t('copy_max_tip'));
    }
    let copyFunc = onCopy;
    if (typeof onCopy === 'string') {
      copyFunc = methods[onCopy];
    }

    if (isFunction(copyFunc)) {
      copyFunc((funData?: any) => add(funData || data), { schema, data });
      return;
    }
    add(data);
  };

  const handleDelete = () => {
    if (isFunction(removeBtn?.onClick)) {
      removeBtn.onClick(() => {
        form.setSchemaByPath(path, { hidden: true });
      });
      return;
    }
    form.setSchemaByPath(path, { hidden: true });
  };

  const operateBtnType = globalConfig?.listOperate?.btnType;

  let ruleList: any = [];
  if (!readOnly) {
    ruleList = [
      {
        validator: async (_: any, data: any) => {
          setListData(data);
          if (!otherSchema?.min) {
            return;
          }
          if (!data || data.length < otherSchema.min) {
            return Promise.reject(
              new Error(
                otherSchema?.message?.min ||
                `数据长度必须大于等于${otherSchema.min}`
              )
            );
          }
        }
      },
      ...transformRules(rules || [], methods, form)
    ];
  }

  return (
    <>
      <Form.List
        name={path}
        initialValue={defaultValue}
        rules={ruleList}
      >
        {(fields, operation, { errors }) => (
          <>
            <Widget
              {...otherListProps}
              configContext={configContext}
              form={form}
              schema={otherSchema}
              fields={fields}
              operation={operation}
              path={path}
              listName={path}
              parentLitPath={parentLitPath}
              rootPath={[...preRootPath, ...path]}
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
              copyItem={handleCopy(operation.add, fields)}
              temporary={{
                displayType
              }}
              addBtnProps={{
                ...defaultAddBtnProps,
                ...addBtnProps,
              }}
              delConfirmProps={{
                ...defaultDelConfirmProps,
                ...delConfirmProps,
              }}
              actionColumnProps={{
                ...defaultActionColumnProps,
                ...actionColumnProps,
              }}
              copyBtnProps={{
                children: t('copy'),
                btnType: operateBtnType
              }}
              editorBtnProps={{
                children: t('edit'),
                btnType: operateBtnType
              }}
              deleteBtnProps={{
                children: t('delete'),
                btnType: operateBtnType
              }}
              moveUpBtnProps={{
                children: t('moveUp'),
                btnType: operateBtnType
              }}
              moveDownBtnProps={{
                children: t('moveDown'),
                btnType: operateBtnType
              }}
            />
            {errors?.length !== 0 && (
              <div style={{ marginBottom: '12px' }}>
                <Form.ErrorList errors={errors} />
              </div>
            )}
          </>
        )}
      </Form.List>
      {removeBtn && (
        <Button
          type='link'
          danger
          {...removeBtn}
          onClick={handleDelete}
        >
          {removeBtn?.text || t('delete')}
        </Button>
      )}
    </>
  );
}
