import React, { useContext } from 'react';
import { Form, message, ConfigProvider, Button } from 'antd';
import { isFunction, translation } from '../../utils';

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
};

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

  const { widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgets[widgetName];

  const { props: listProps,  removeBtn, ...otherSchema } = schema;

  let defaultValue = schema.default ?? schema.defaultValue;
  if (defaultValue === undefined && !['drawerList', 'list1'].includes(widgetName)) {
    defaultValue = [{}];
  }

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
      moveFunc(() => move(form, to), { schema, form, to });
      return;
    }

    move(form, to);
  };

  const handleCopy = (add: any, fields: any) => (value: any) => {
    if (schema.max && fields.length === schema.max) {
      return message.warning(t('copy_max_tip'));
    }
    let copyFunc = onCopy;
    if (typeof onCopy === 'string') {
      copyFunc = methods[onCopy];
    }

    if (isFunction(copyFunc)) {
      copyFunc((funData?: any) => add(funData || value), { schema, value });
      return;
    }
    add(value);
  };

  const handleDetele = () => {
    if (isFunction(removeBtn?.onClick)) {
      removeBtn.onClick(() => {
        form.setSchemaByPath(path, { hidden: true });
      });
      return;
    }
    form.setSchemaByPath(path, { hidden: true });
  };

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  const readOnly = getValueFromKey('readOnly');
  const preRootPath = (rootPath || []).splice(0, rootPath.length - 1);
  const displayType = getValueFromKey('displayType');

  if (hideMove === undefined && globalConfig?.listOperate?.hideMove) {
    hideMove = globalConfig?.listOperate.hideMove;
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

  const operateBtnType = globalConfig?.listOperate?.btnType;

  return (
    <>
      <Form.List
        name={path}
        initialValue={defaultValue}
        rules={
          otherSchema?.min ? [
            {
              validator: async (_, data) => {
                if (!data || data.length < otherSchema.min) {
                  return Promise.reject(
                    new Error(
                      otherSchema?.message?.min ||
                      `数据长度必须大于等于${otherSchema.min}`
                    )
                  );
                }
              }
            }
          ]
            : null
        }
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
          onClick={handleDetele}
        >
          {removeBtn?.text || t('delete')}
        </Button>
      )}

    </>
  );
}
