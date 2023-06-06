import React from 'react';
import isHidden from './isHidden';
import { getValueFromKey, transformData, isDataEmpty, startsWith } from '../utils/common';
import classnames from 'classnames';
import { parseAllExpression } from './expression';

const InnerHtml = (props: any) => {
  const { data, style, className } = props;

  if (typeof data === 'object') {
    return null;
  }

  return (
    <span
      className={classnames(null, { [className]: !!className })}
      style={style}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
};

export default (props: any, parentData: any, storeMethod: any) => {
  // 获取对应数据
  const getValue = (params: any) => {
    return getValueFromKey({ data: parentData, storeMethod, ...params });
  };

  const { dataKey, defaultValue, ...rest } = props;

  // 当组件配置 dataKey，根据 dataKey 获取服务端对应数据，否则继承父级数据
  let value = dataKey ? getValue({ path: dataKey, defaultValue }) : defaultValue ?? parentData;

  // 解析函数表达式，替换值
  const restProps = parseAllExpression(rest, {
    parentData,
    sourceData: storeMethod.getSourceData(),
    data: value,
  });

  // console.log('before:', props, 'after:', restProps);

  let {
    widget,
    data,
    children,
    showKey,
    showLevel,
    format,
    getCompProps,
    leftTextKey,
    rightTextKey,
    hrefKey,
    labelKey,
    leftUnitKey,
    rightUnitKey,
    titleKey,
    ...componentProps
  } = restProps;

  showLevel = showLevel ?? storeMethod?.getConfig()?.showLevel;

  // 当组件配置 showKey，服务端对应数据不存在时，直接返回不显示
  if (showKey && isHidden(showKey, parentData, storeMethod)) {
    return null;
  }

  // 根据 widget 创建对应组件，先从外部获取，如果没有，再从内置组件中获取
  const component = storeMethod.getWidget(widget);

  if (!component) {
    console.warn(widget, '未找到对应组件，请检查配置项 widget 是否配置正确');
    return null;
  }

  // 如果有传人的数据，直接使用
  if (data || data === 0) {
    value = data;
  }

  // 数据进行格式化
  if (['html'].includes(format?.type)) {
    value = <InnerHtml data={value} />;
  } else {
    value = transformData(value, format, parentData, storeMethod);
  }

  // 当配置 showLevel 需要校验数据是否为空
  if ([1, 2].includes(showLevel) && isDataEmpty(value, showLevel)) {
    return null;
  }

  // 进行动态数据绑定
  Object.keys(componentProps).forEach((key) => {
    const item = componentProps[key];
    if (typeof item !== 'string') {
      return;
    }

    if (startsWith(item, 'source:')) {
      componentProps[key] = getValue({ path: item });
      return;
    }

    if (startsWith(item, 'data:')) {
      const path = item.split('data:')[1]?.trim();
      componentProps[key] = getValue({ path });
    }
  });

  // 子组件可能需要此数据
  componentProps.dataKey = dataKey;
  componentProps.getParentData = () => parentData;

  // 根据配置的 key 获取相应的数据
  if (hrefKey) {
    componentProps.href = getValue({ path: hrefKey, valueType: '!object' });
  }

  if (leftTextKey) {
    componentProps.leftText = getValue({ path: leftTextKey, valueType: '!object' });
  }

  if (rightTextKey) {
    componentProps.rightText = getValue({ path: rightTextKey, valueType: '!object' });
  }

  if (leftUnitKey) {
    componentProps.leftUnit = getValue({ path: leftUnitKey, valueType: '!object' });
  }

  if (rightUnitKey) {
    componentProps.rightUnit = getValue({ path: rightUnitKey, valueType: '!object' });
  }

  if (labelKey) {
    componentProps.label = getValue({ path: labelKey, valueType: '!object' });
  }

  if (titleKey) {
    componentProps.title = getValue({ path: titleKey, valueType: '!object' });
  }

  if (children) {
    componentProps.childSchema = children;
  }

  if (widget === 'FEncryption') {
    componentProps.dataKey = dataKey;
  }

  // 通过外部方法，获取组件配置信息
  let asyncComptProps = {};
  const getPropsFunc = getCompProps && storeMethod.getMethod(getCompProps);
  if (getPropsFunc) {
    asyncComptProps = getPropsFunc(props, { data: value, parentData }) || {};
  }

  return {
    componentProps,
    asyncComptProps,
    componentData: value,
    component,
  };
};
