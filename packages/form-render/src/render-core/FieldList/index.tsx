import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand';
import { FRContext, ConfigContext } from '../../models/context';
import { parseAllExpression } from '../../models/expression';
import { getFormListLayout, getParamValue, getLabel, getTooltip } from './modules';
import Main from './main';

const UpperContext = createContext(() => {});

export default (props: any) => {
  const store = useContext(FRContext);
  const configContext = useContext(ConfigContext);

  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const { form, widgets, methods } = configContext;

  const { displayType } = formCtx;
  const isDisplayColumn = displayType === 'column';
  const { schema:_schema, path,} = props;

  const formData = form.getFieldsValue(true);
  const { schema: formSchema } = store.getState();

  const { items, ...otherSchema } = _schema;
  const schema = {
    items,
    ...parseAllExpression(otherSchema, formData, props.rootPath, formSchema)
  };
  
  const { widget } = schema;
  let widgetName = widget || 'list1';

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  const value = Form.useWatch(path, form);
 
  const label = getLabel(schema, displayType, widgets);
  const tooltip = getTooltip(schema, displayType);
  const { labelCol, fieldCol } = getFormListLayout(getValueFromKey);

  let isInline = schema.display === 'inline';
  if (!value && widgetName !== 'drawerList') {
    isInline = true;
  }

  if (schema.hidden) {
    return null;
  }
  
  return (
    <Col span={24}>
      {!isInline && !isDisplayColumn && label && (
        <Form.Item
          className='ant-form-item-optional-hide'
          label={label}
          labelAlign={'left'}
          colon={false}
          tooltip={tooltip}
          style={{ marginBottom: 0 }}
        >
        </Form.Item>
      )}
      <Form.Item
        className='ant-form-item-optional-hide'
        label={label} 
        labelCol={labelCol}
        wrapperCol={fieldCol}
        noStyle={!isInline && !isDisplayColumn}
        tooltip={tooltip}
      >
        <Main
          {...props}
          form={form}
          methods={methods}
          formCtx={formCtx}
          upperCtx={upperCtx}
          widgets={widgets}
          configContext={configContext}
        />
      </Form.Item>
    </Col>
  );
}