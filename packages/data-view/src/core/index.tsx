import React from 'react';
import { isFunction } from 'lodash-es';
import RenderCore from './renderer';
import { getRequestParams } from '../utils/common';
import { parseExpression } from '../models/expression';
import { DataVProps } from '../type';
import './index.less';

const defaultConfig = {
  showLevel: 0,
};

export default (props: DataVProps) => {
  const { schema, data, sourceData, widgets, methods, config = {} } = props;

  // 获取顶层数据
  const getSourceData = () => {
    return sourceData || data;
  };

  // 获取外部自定义方法
  const getMethod = (_name: string) => {
    let name = _name;
    if (name && name.startsWith('method:')) {
      const [_, funcName] = _name.replace(/\s+/g, '').split('method:');
      name = funcName;
    }

    const func = methods[name];
    if (!isFunction(func)) {
      console.warn(`${name}：自定义方法不存在或者 ${name}：并不是一个函数`);
      return () => null;
    }

    return func;
  };

  // 获取外部自定义组件
  const getWidget = (widgetName: string) => {
    if (!widgets?.[widgetName]) {
      console.warn(`${widgets} 未找到对应组件，请检查协议配置`);
      return null;
    }
    return (widgets as any)[widgetName];
  };

  // 获取接口配置
  const getRequestConfig = () => {
    return {
      dataKey: 'module',
      ...config.request,
    };
  };

  // 获取接口入参
  const getRequestPrams = (params: any, { insideData }: any) => {
    return getRequestParams(params, data, insideData);
  };

  const getConfig = () => ({
    ...defaultConfig,
    ...config,
  });

  const getDataFromKey = (_key: string, currentData: any, defaultValue: any) => {
    if (!_key) {
      return currentData;
    }
    const key = ['data:', 'source:', 'parent:', '{{'].some(item => _key.includes(item)) ? _key : `currentData.${_key}`;
    return parseExpression(key, { currentData, sourceData: data }) ?? defaultValue;
  }

  const renderer = ({ data, schema, addons }: any) => {
    return <RenderCore schema={schema} data={data} addons={addons} />;
  };

  return (
    <RenderCore
      data={data || {}}
      schema={schema}
      addons={{
        renderer,
        getMethod,
        getWidget,
        getSourceData,
        getRequestConfig,
        getRequestPrams,
        getConfig,
        getDataFromKey
      }}
    />
  );
};
