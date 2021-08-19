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
  // $id,
}) => {
  const {
    widgets,
    mapping,
    setErrorFields,
    setSchema,
    resetFields,
    removeErrorField,
  } = useTools();

  const { globalData } = useStore();

  // TODO1: 需要查一下卡顿的源头
  // if (isObjType(schema)) {
  //   return <Map value={value} onChange={onChange} children={children} />;
  // }
  // if (isListType(schema)) {
  //   return 'haha';
  // }
  // return <Input value={value} onChange={e => onChange(e.target.value)} />;

  // TODO: 计算是哪个widget，需要优化
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
    ...globalData,
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

  // 避免传组件不接受的props，按情况传多余的props
  widgetProps.addons = {
    dependValues,
    onItemChange,
    setValue: onItemChange, // onItemChange 已经文档放出去了，不去掉了，但改个好理解的名字
    getValue,
    formData,
    dataPath,
    dataIndex,
    setErrorFields,
    setSchema,
    resetFields,
    removeErrorField,
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
  if (prev.schema && prev.schema.$id === '#') {
    return false;
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
