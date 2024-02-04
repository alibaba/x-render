import React, { createContext, useContext, useState } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand';
import { FRContext } from '../../models/context';
import { parseAllExpression } from '../../models/expression';
import { getFormListLayout, getParamValue, getLabel, getTooltip } from './modules';
import Main from './field';

const UpperContext = createContext(() => {});

export default (props: any) => {
  const [_, setListData] = useState([]);
  const { configContext } = props;
  
  const store = useContext(FRContext);
  
  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const { form, widgets, methods, globalConfig } = configContext;

  const { displayType } = formCtx;
  const isDisplayColumn = displayType === 'column';
  const { schema:_schema } = props;

  const formData = form.getFieldsValue(true);
  const { schema: formSchema } = store.getState();

  const { items, className, ...otherSchema } = _schema;
  const schema = globalConfig?.mustacheDisabled ? _schema : {
    items,
    ...parseAllExpression(otherSchema, formData, props.rootPath, formSchema)
  };
  
  const { widget } = schema;
  let widgetName = widget || 'list1';

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
 
  const label = getLabel(schema, displayType, widgets);
  const tooltip = getTooltip(schema, displayType);
  const { labelCol, fieldCol } = getFormListLayout(getValueFromKey, displayType);

  let isInline = schema.display === 'inline';
  const preRootPath = [...(props.rootPath || [])].splice(0, props.rootPath.length - 1);
  const listData = form.getFieldValue([...preRootPath, ...props.path]);
  if (!listData?.length && widgetName !== 'drawerList') {
    isInline = true;
  }

  if (schema.hidden) {
    return null;
  }

  return (
    <Col span={24} className={className}>
      {!isInline && !isDisplayColumn && label && (
        <Form.Item
          className='ant-form-item-optional-hide'
          label={label}
          labelAlign={'left'}
          colon={false}
          tooltip={tooltip}
          style={{ marginBottom: 0 }}
          labelCol={{ span: 24 }}
        >
        </Form.Item>
      )}
      <Form.Item
        label={label} 
        labelCol={isDisplayColumn ? { span: 24 } : labelCol}
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
          setListData={setListData}
        />
      </Form.Item>
    </Col>
  );
}