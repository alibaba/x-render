import React, { Suspense } from 'react';
import { getWidgetName, extraSchemaList } from '../../mapping';
import { useTools, useStore } from '../../hooks';
import { transformProps } from '../../createWidget';

import { isObjType, isListType, isObject } from '../../utils';

const ErrorSchema = schema => {
  return (
    <div>
      <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
};

const ExtendedWidget = ({
  schema,
  onChange,
  value,
  dependValues,
  children,
  onItemChange,
  formData,
  getValue,
  readOnly,
  dataPath,
  disabled,
  dataIndex,
}) => {
  const {
    widgets,
    mapping,
    setValueByPath,
    getSchemaByPath,
    setSchemaByPath,
    setSchema,
    setValues,
    getValues,
    resetFields,
    setErrorFields,
    removeErrorField,
  } = useTools();

  const { globalProps } = useStore();

  // if (isObjType(schema)) {
  //   return <Map value={value} onChange={onChange} children={children} />;
  // }
  // if (isListType(schema)) {
  //   return 'haha';
  // }
  // return <Input value={value} onChange={e => onChange(e.target.value)} />;

  // TODO: calc widget, better way?
  // let widgetName = useMemo(() => getWidgetName(schema, mapping), [
  //   JSON.stringify(schema),
  // ]);
  let widgetName = getWidgetName(schema, mapping);
  const customName = schema.widget || schema['ui:widget'];
  if (customName && widgets[customName]) {
    widgetName = customName;
  }
  const readOnlyName = schema.readOnlyWidget || 'html';
  if (readOnly && !isObjType(schema) && !isListType(schema)) {
    widgetName = readOnlyName;
  }
  if (!widgetName) {
    widgetName = 'input';
    return <ErrorSchema schema={schema} />;
  }
  const Widget = widgets[widgetName];
  const extraSchema = extraSchemaList[widgetName];

  let widgetProps = {
    schema: { ...schema, ...extraSchema },
    onChange,
    value,
    children,
    disabled,
    readOnly,
    ...schema.props,
    ...globalProps,
  };

  if (schema.type === 'string' && typeof schema.max === 'number') {
    widgetProps.maxLength = schema.max;
  }

  ['title', 'placeholder', 'disabled', 'format'].forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  if (schema.props) {
    widgetProps = { ...widgetProps, ...schema.props };
  }

  Object.keys(schema).forEach(key => {
    if (
      typeof key === 'string' &&
      key.toLowerCase().indexOf('props') > -1 &&
      key.length > 5
    ) {
      widgetProps[key] = schema[key];
    }
  });

  // 支持 addonAfter 为自定义组件的情况
  if (isObject(widgetProps.addonAfter) && widgetProps.addonAfter.widget) {
    const AddonAfterWidget = widgets[widgetProps.addonAfter.widget];
    widgetProps.addonAfter = <AddonAfterWidget {...schema} />;
  }

  const hideSelf = (hidden = true) => {
    setSchemaByPath(schema.$id, { hidden });
  };

  // 避免传组件不接受的props，按情况传多余的props
  widgetProps.addons = {
    dependValues,
    onItemChange,
    getValue,
    formData,
    dataPath,
    dataIndex,
    setValueByPath,
    setValue: setValueByPath,
    getSchemaByPath,
    setSchemaByPath,
    setSchema,
    setValues,
    getValues,
    resetFields,
    setErrorFields,
    removeErrorField,
    hideSelf,
  };

  const finalProps = transformProps(widgetProps);

  return (
    <Suspense fallback={<div></div>}>
      <div className="fr-item-wrapper">
        <Widget {...finalProps} />
      </div>
    </Suspense>
  );
};

const areEqual = (prev, current) => {
  if (prev.schema && current.schema) {
    if (prev.schema.$id === '#') {
      return false;
    }
    if (prev.schema.hidden && current.schema.hidden) {
      return true;
    }
  }
  if (prev.readOnly !== current.readOnly) {
    return false;
  }
  if (prev.disabled !== current.disabled) {
    return false;
  }
  if (
    JSON.stringify(prev.dependValues) !== JSON.stringify(current.dependValues)
  ) {
    return false;
  }
  if (isObjType(prev.schema) && isObjType(current.schema)) {
    return false;
  }
  if (
    JSON.stringify(prev.value) === JSON.stringify(current.value) &&
    JSON.stringify(prev.schema) === JSON.stringify(current.schema)
  ) {
    return true;
  }
  return false;
};

export default React.memo(ExtendedWidget, areEqual);
