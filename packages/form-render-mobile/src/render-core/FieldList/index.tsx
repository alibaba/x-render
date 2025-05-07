import { Form, Grid } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import { parseAllExpression } from 'form-render/es/models/expression';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { ConfigContext, FRContext } from '../../models/context';
import { isFunction } from '../../utils';
import './index.less';

const UpperContext = createContext(() => {});
const getParamValue =
  (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
    return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
  };

export default (props: any) => {
  const { schema: _schema, path, renderCore, rootPath: _rootPath } = props;

  const store: any = useContext(FRContext);
  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const { form, methods }: any = useContext(ConfigContext);

  const formData = form.getFieldsValue(true);
  const { schema: formSchema } = store.getState();

  const { items, ...otherSchema } = _schema;
  const schema = {
    items,
    ...parseAllExpression(otherSchema, formData, _rootPath, formSchema),
  };

  const defaultValue = schema.default ?? (schema.defaultValue || [{}]);
  const { onAdd, onRemove } = schema.props || {};
  const [fieldLength, setFieldLength] = useState<number>();

  useEffect(() => {
    const fieldsLength = getFieldsLength();
    setFieldLength(fieldsLength);
  }, []);

  const getFieldsLength = () => {
    const fieldValue = form.getFieldValue(path);
    return Array.isArray(fieldValue) ? fieldValue.length : 0;
  };

  const handleAdd = (add: any, data?: any) => {
    let addFunc = onAdd;
    if (typeof onAdd === 'string') {
      addFunc = methods[onAdd];
    }

    if (isFunction(addFunc)) {
      addFunc((funData?: any) => add(funData || data), { schema, data });
      return;
    }
    add(data);
    const fieldsLength = getFieldsLength();
    setFieldLength(fieldsLength);
  };

  const handleRemove = (remove: any, index: number) => {
    let removeFunc = onRemove;
    if (typeof onRemove === 'string') {
      removeFunc = methods[onRemove];
    }

    if (isFunction(removeFunc)) {
      removeFunc(() => remove(index), { schema, index });
      return;
    }

    remove(index);

    const fieldsLength = getFieldsLength();
    setFieldLength(fieldsLength);
  };

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  const readOnly = getValueFromKey('readOnly');

  if (schema.hidden) {
    return null;
  }

  const preRootPath = [...(_rootPath || [])].splice(0, _rootPath.length - 1);
  const rootPath = [...preRootPath, ...path];

  return (
    <Grid.Item className="frm-list">
      <Form.Array
        name={path}
        initialValue={defaultValue}
        renderAdd={
          !readOnly && (!schema.max || fieldLength < schema.max)
            ? () => (
                <span>
                  <AddCircleOutline /> 添加
                </span>
              )
            : undefined
        }
        onAdd={({ add }) => handleAdd(add)}
        renderHeader={({ index }, { remove }) => (
          <>
            {schema.title && (
              <span>
                {schema.title} {index + 1}
              </span>
            )}
            {!readOnly && (!schema.min || fieldLength > schema.min) && (
              <a
                onClick={() => handleRemove(remove, index)}
                style={{ float: 'right' }}
              >
                删除
              </a>
            )}
          </>
        )}
      >
        {fields =>
          fields.map(({ index }) => {
            return renderCore({
              schema,
              parentPath: [index],
              rootPath: [...rootPath, index],
            });
          })
        }
      </Form.Array>
    </Grid.Item>
  );
};
