import React, { useMemo } from 'react';
import { getWidgetName, extraSchemaList } from '../../mapping';
import { defaultWidgetNameList } from '../../widgets/antd';
import { useTools } from '../../hooks';
import { transformProps } from '../../createWidget';

// import { isObjType, isListType } from '../../utils';
// import { Input } from 'antd';
// import Map from '../../widgets/antd/map';

const ExtendedWidget = ({
  schema,
  onChange,
  value,
  children,
  onItemChange,
  readOnly,
  dataPath,
  dataIndex,
}) => {
  const { widgets, mapping } = useTools();

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
  if (readOnly) {
    if (['object', 'array'].indexOf(schema.type) === -1) {
      widgetName = 'html';
    }
  }
  let Widget = widgets[widgetName];
  const customName = schema.widget || schema['ui:widget'];
  if (customName && widgets[customName]) {
    Widget = widgets[customName];
    widgetName = customName;
  }

  const extraSchema = extraSchemaList[widgetName];

  let widgetProps = {
    schema: { ...schema, ...extraSchema },
    onChange,
    value,
    children,
    ...schema.props,
  };

  ['title', 'placeholder', 'disabled'].forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  if (schema.default !== undefined) {
    widgetProps.defaultValue = schema.default;
  }

  if (schema.props) {
    widgetProps = { ...widgetProps, ...schema.props };
  }

  // 避免传组件不接受的props，按情况传多余的props
  // const isExternalWidget = defaultWidgetNameList.indexOf(widgetName) === -1; // 是否是外部组件
  widgetProps.addons = { onItemChange, dataPath, dataIndex };

  const finalProps = transformProps(widgetProps);

  return <Widget {...finalProps} />;
};

const areEqual = (prev, current) => {
  if (prev.schema && prev.schema.$id === '#') {
    return false;
  }
  if (prev.schema && prev.schema.type === 'object') {
    return false;
  }
  if (
    prev.value === current.value &&
    JSON.stringify(prev.schema) === JSON.stringify(current.schema)
  ) {
    if (window.NOTHING_CHANGED_IN_WIDGETS) {
      return true; // TODO: return true 之后 useForm 里的 formData 的更新会出问题，why
    }
  }
  return false;
};

export default React.memo(ExtendedWidget, areEqual);
