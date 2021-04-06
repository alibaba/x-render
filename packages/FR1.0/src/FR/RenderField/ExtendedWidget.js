import React, { useMemo } from 'react';
import { getWidgetName, extraSchemaList } from '../../mapping';
import { defaultWidgetNameList } from '../../widgets/antd';
import { useTools } from '../../hooks';
import { transformProps } from '../../HOC';

// import { isObjType, isListType } from '../../utils';
// import { Input } from 'antd';
// import Map from '../../widgets/antd/map';

const ExtendedWidget = ({
  schema,
  onChange,
  value,
  children,
  onItemChange,
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
  let Widget = widgets[widgetName];
  const customName = schema['ui:widget'];
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
  const isExternalWidget = defaultWidgetNameList.indexOf(widgetName) === -1; // 是否是外部组件
  if (isExternalWidget) {
    widgetProps.onItemChange = onItemChange; // 只给外部组件提供，默认的组件都是简单组件，不需要，多余的props在antd的input上会warning，很烦
  }

  const finalProps = transformProps(widgetProps);

  return <Widget {...finalProps} />;
};

const areEqual = (prev, current) => {
  console.log('areEqual', prev.value, current.value);
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
      console.log('prevent');
      return true; // TODO: return true 之后 useForm 里的 formData 的更新会出问题，why
    }
  }
  return false;
};

export default React.memo(ExtendedWidget, areEqual);
