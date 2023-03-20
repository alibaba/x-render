import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand';
import { FRContext, ConfigContext } from '../../models/context';
import { parseAllExpression } from '../../models/expression';

import Main from './main';

const UpperContext = createContext(() => {});

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
};

const getLabel = (schema: any, displayType: string, widgets: any) => {
  const { title, description, descWidget, labelWidget } = schema;
  const LabelNode = widgets[labelWidget];

  if (LabelNode) {
    return <LabelNode schema={schema} />
  }

  if ((!description && !descWidget)) {
    return title;
  }

  const RenderDesc = () => {
    const Widget = widgets[descWidget];
    if (Widget) {
      return <Widget schema={schema} />;
    }

    if (description) {
      return (
        <span className='fr-desc ml2'>
          ({description})
        </span>
      )
    }
    return null;
  };

  if (displayType === 'inline') {
    return title;
  }

  return (
    <>
      {title}
      <RenderDesc />
    </>
  )
};

const getTooltip = (schema: any, displayType: string) => {
  const { descType, description, tooltip } = schema;

  if (tooltip) {
    if (typeof tooltip === 'string') {
      return { title: <span dangerouslySetInnerHTML={{ __html: tooltip }} /> };
    }

    return {
      ...tooltip,
      title: <span dangerouslySetInnerHTML={{ __html: tooltip.title }} />,
    };
  }

  if (descType === 'widget' || !description) {
    return null;
  }

  if (displayType === 'column' && descType === 'icon') {
    return {
      title: description
    }
  }

  return null;
};

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

  const { fieldCol, labelCol } = schema || {};
  
  const { widget } = schema;
  let widgetName = widget || 'list1';

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  const value = Form.useWatch(path, form);
 
  const label = getLabel(schema, displayType, widgets);
  const tooltip = getTooltip(schema, displayType);
  const labelWidth = getValueFromKey('labelWidth')


  let _labelCol: any = { span: 3 };
  let _fieldCol = { flex: 1 }

  if (labelWidth) {
    _labelCol = { flex : labelWidth + 'px' };
  }

  if (labelCol) {
    _labelCol = labelCol;
  }

  if (fieldCol) {
    _fieldCol = fieldCol;
  }

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
        labelCol={_labelCol}
        wrapperCol={_fieldCol}
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