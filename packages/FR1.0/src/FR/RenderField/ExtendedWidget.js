import React, { useMemo } from 'react';
import { getWidgetName, extraSchemaList } from '../../mapping';
import { defaultWidgetNameList } from '../../widgets/antd';
import { useStore } from '../../hooks';
import { transformProps } from '../../HOC';

const ExtendedWidget = ({
  title,
  schema,
  onChange,
  value,
  children,
  onItemChange,
}) => {
  const { widgets, mapping } = useStore();

  // TODO: 计算是哪个widget，需要优化
  let widgetName = getWidgetName(schema, mapping);
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
