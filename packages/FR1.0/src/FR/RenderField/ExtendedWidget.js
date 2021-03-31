import React, { useMemo } from 'react';
import { getWidgetName, extraSchemaList } from '../../mapping';
import { defaultWidgetNameList } from '../../widgets/antd';
import { useTools } from '../../hooks';
import { transformProps } from '../../HOC';

// import { isObjType, isListType } from '../../utils';
// import { Input } from 'antd';
// import Map from '../../widgets/antd/map';

const ExtendedWidget = ({
  title,
  schema,
  onChange,
  value,
  children,
  onItemChange,
}) => {
  const { widgets, mapping } = useTools();

  // TODO1: 原来慢在这里啊！！！每次渲染都在算用哪个组件，这段代码用于测试
  // if (isObjType(schema)) {
  //   return <Map value={value} onChange={onChange} children={children} />;
  // }
  // if (isListType(schema)) {
  //   return 'haha';
  // }
  // return <Input value={value} onChange={e => onChange(e.target.value)} />;

  // TODO: 计算是哪个widget，需要优化
  let widgetName = useMemo(() => getWidgetName(schema, mapping), [
    JSON.stringify(schema),
  ]);
  let Widget = widgets[widgetName];
  const customName = schema['ui:widget'];
  if (customName && widgets[customName]) {
    Widget = widgets[customName];
    widgetName = customName;
  }

  const extraSchema = extraSchemaList[widgetName];

  const widgetProps = {
    schema: { ...schema, ...extraSchema },
    onChange,
    value,
    children,
  };

  if (title) {
    widgetProps.title = title;
  }

  // 避免传组件不接受的props，按情况传多余的props
  const isExternalWidget = defaultWidgetNameList.indexOf(widgetName) === -1; // 是否是外部组件
  if (isExternalWidget) {
    widgetProps.onItemChange = onItemChange; // 只给外部组件提供，默认的组件都是简单组件，不需要，多余的props会warning，很烦
  }

  const finalProps = transformProps(widgetProps);

  return <Widget {...finalProps} />;
};

export default ExtendedWidget;
