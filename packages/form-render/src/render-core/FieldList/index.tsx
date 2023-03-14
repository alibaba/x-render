import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand';
import { FRContext, ConfigContext } from '../../models/context';
import Main from './main';

const UpperContext = createContext(() => {});

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
};

const getLabel = (schema: any, displayType: string, widgets: any) => {
  const { title, description, descWidget } = schema;

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
  const { schema, path } = props;
  
  const { title, widget } = schema;
  let widgetName = widget || 'list1';

  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  const value = Form.useWatch(path, form);
  const labelCol = getValueFromKey('labelCol');
  const label = getLabel(schema, displayType, widgets);
  const tooltip = getTooltip(schema, displayType);

  let isInline = schema.display === 'inline';
  if (!value && widgetName !== 'drawerList') {
    isInline = true;
  }

  return (
    <Col span={24}>
      {!isInline && !isDisplayColumn && label && (
        <Form.Item 
          label={label}
          labelAlign={'left'}
          colon={false}
          tooltip={tooltip}
          style={{ marginBottom: 0 }}
        >
        </Form.Item>
      )}
      <Form.Item 
        label={label} 
        labelCol={labelCol} 
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