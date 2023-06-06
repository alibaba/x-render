import React from 'react';
import InnerHtml from '../InnerHtml';

const ReactNode = (props: any) => {
  const { schema, data, storeMethod } = props;

  if (!schema) {
    return null;
  }

  // 当 data 为字符串时，直接返回
  if (typeof schema === 'string') {
    //  直接返回
    if (!schema.includes('render:')) {
      return <InnerHtml data={schema} />;
    }

    // 如果字符串中包含 render: 则调用 render 方法进行渲染
    const [_, funcName] = schema.split('render:');
    const renderFunc = storeMethod.getMethod(funcName);
    return renderFunc(data);
  }

  // 当 data 为对象时，则调用 FRender 组件进行渲染
  return storeMethod.renderer({ schema, data, storeMethod });
};

export default ReactNode;
