import React from 'react';
import { transformData, isDataEmpty } from '../utils/common';
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

export default (props: any, parentData: any, addons: any) => {
  const { dataKey, defaultValue, children, ...rest } = props;
  const { getDataFromKey, getSourceData, getMethod, getConfig, getWidget } = addons;
  const sourceData = getSourceData();

  // 当组件配置 dataKey，根据 dataKey 获取服务端对应数据，否则继承父级数据
  let value = dataKey ? getDataFromKey(dataKey, parentData, defaultValue) : defaultValue ?? parentData;

  // 解析函数表达式，替换值
  const restProps = parseAllExpression(rest, {
    parentData,
    sourceData,
    currentData: value,
  });
  // console.log('before:', props, 'after:', restProps);

  const { widget, data, showLevel: _showLevel, format, getCompProps, hidden, ...componentProps } = restProps;

  if (hidden && typeof hidden === 'boolean') {
    return;
  }

  if (hidden?.includes('method:')) {
    // 如果是通过协议声明的函数，获取函数并执行
    const func = getMethod(hidden);
    if (func && func(props, { data: value, parentData, sourceData })) {
      return null;
    }
  }

  // 根据 widget 创建对应组件，先从外部获取，如果没有，再从内置组件中获取
  const component = getWidget(widget);

  if (!component) {
    console.warn(widget, '未找到对应组件，请检查配置项 widget 是否配置正确');
    return null;
  }

  // 如果有传人的数据，直接使用
  if (data !== undefined) {
    value = data;
  }

  // 数据进行格式化
  if (['html'].includes(format?.type)) {
    value = <InnerHtml data={value} />;
  } else {
    value = transformData(value, format, parentData, addons);
  }

  const showLevel = _showLevel ?? getConfig()?.showLevel;

  // 当配置 showLevel 需要校验数据是否为空
  if ([1, 2].includes(showLevel) && isDataEmpty(value, showLevel)) {
    return null;
  }

  if (children) {
    componentProps.childSchema = children;
  }

  // 通过外部方法，获取组件配置信息
  let asyncComptProps = {};
  const getPropsFunc = getCompProps && getMethod(getCompProps);
  if (getPropsFunc) {
    asyncComptProps = getPropsFunc(props, { data: value, parentData, sourceData }) || {};
  }

  return {
    componentProps,
    asyncComptProps,
    componentData: value,
    component
  };
};
