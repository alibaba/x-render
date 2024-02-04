import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { Form, Grid, FormItemProps } from 'antd-mobile';
import { useStore } from 'zustand';
import classnames from 'classnames';

import { _get, getWidget } from '../../utils';
import { ConfigContext } from '../../models/context';
import getRuleList from 'form-render/es/models/validates';
import FieldWrapper from './field';
import { 
  getParamValue, 
  getFieldProps,
  getPath,
  getLabel,
  getExtraView,
} from './module';

const UpperContext: any = createContext(() => {});
const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked',
  Checkbox: 'checked',
  Switch: 'checked'
};

export default (props: any) => {
  const { store, schema, path, children, dependValues, rootPath, renderCore } = props;

  if (schema?.hidden) {
    return null;
  }

  const [needOnClick, setNeedOnClick] = useState(false);

  const fieldRef: any = useRef();
  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const configCtx = useContext(ConfigContext);
  
  const { form, widgets, methods, globalProps }: any = configCtx;
  const { hidden, properties, dependencies, inlineMode: _inlineMode, remove, removeText, visible = true, layout, ...otherSchema } = schema;
  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  useEffect(() => {
    form.setFieldRef(fieldProps.addons.dataPath, fieldRef);
  }, []);

  useEffect(() => {
    if (fieldRef?.current?.open) {
      setNeedOnClick(true);
    }
  }, [fieldRef.current]);
  

  let Widget = getWidget(widgets, schema.widget, schema)

  const fieldProps = getFieldProps(schema, {
    widgets,
    methods,
    form,
    dependValues,
    globalProps,
    path: getPath(path),
    rootPath,
    fieldRef
  });

  const displayType = getValueFromKey('displayType');
  const labelWidth = getValueFromKey('labelWidth');

  if (['collapse'].includes(schema.widget)) {
    return <Widget {...fieldProps} renderCore={renderCore} />
  }

  if (children) {
    fieldProps.children = (
      <Grid columns={1}>
        {children}
      </Grid>
    );
    
    return (
      <UpperContext.Provider
        value={{
          column: schema.column,
          labelCol: schema.labelCol,
          fieldCol: schema.fieldCol,
          displayType: schema.displayType,
          labelWidth: schema.labelWidth,
          noStyle: schema.noStyle,
          exist: true,
        }}
      >
        <Widget 
          labelWidth={labelWidth} 
          displayType={schema.displayType} 
          {...fieldProps} 
          {...otherSchema} 
        />
      </UpperContext.Provider>
    );
  }

  // Render field components
  let label = getLabel(schema, displayType, widgets, fieldProps.addons);
  let noStyle = getValueFromKey('noStyle');

  const extra = getExtraView('extra', schema, widgets);
  const help = getExtraView('help', schema, widgets);
  const tooltip = getExtraView('tooltip', schema, widgets);
  const ruleList = getRuleList(schema, form, methods, fieldRef);
  const readOnly = getValueFromKey('readOnly');
  const valuePropName = schema.valuePropName || valuePropNameMap[schema.widget] || undefined;

  if (readOnly) {
    fieldProps.readOnly = readOnly;
  }

  if (readOnly) {
    Widget = getWidget(widgets, schema.readOnlyWidget, schema, true);
  }

  const defaultValue = schema.default ?? schema.defaultValue;

  const itemProps: FormItemProps = {
    label,
    valuePropName,
    hidden,
    extra,
    help: tooltip || help,
    noStyle,
    dependencies,
    name: path,
    initialValue: defaultValue,
    rules: readOnly ? [] : ruleList,
    className:classnames('fr-field', {'fr-field-visibility': !visible})
  };

  if (layout) {
    itemProps.layout = {
      column: 'vertical',
      row: 'horizontal',
    }[layout];
  }

  if (!readOnly && needOnClick) {
    itemProps.onClick = () => {
      fieldRef.current.open();
    };
  }

  return (
    <Grid.Item>
      <Form.Item {...itemProps}>
        <FieldWrapper
          Field={Widget}
          fieldProps={fieldProps}
          defaultValue={defaultValue}
        />
      </Form.Item>
    </Grid.Item>
  );
}
