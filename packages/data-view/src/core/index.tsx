import React, { FC } from 'react';
import Renderer from './renderer';
import { getRequestParams } from '../utils/common';
import { DataVProps } from '../type';
import './index.less';

const defaultConfig = {
  showLevel: 0,
};

const DataRender:FC<DataVProps> = (props) => {
  const { schema, data, sourceData, widgets, config = {} } = props;

  // 获取顶层数据
  const getSourceData = () => {
    return sourceData || data;
  };
 
  // 获取外部自定义方法
  const getMethod = (name: string) => {
    const { methods = {} } = props;
    const func = methods[name];

    if (!func) {
      console.warn(`${name} 自定义方法不存在，请检查协议配置`);
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

  const renderFRender = (data: any, schema: any, storeMethod: any) => {
    return <Renderer schema={schema} data={data} storeMethod={storeMethod} />;
  };
 
  return (
    <Renderer
      data={data || {}}
      schema={schema}
      storeMethod={{
        getSourceData,
        getMethod,
        getWidget,
        getRequestConfig,
        getRequestPrams,
        getConfig,
        renderer: renderFRender,
      }}
    />
  );
}

export default DataRender;
