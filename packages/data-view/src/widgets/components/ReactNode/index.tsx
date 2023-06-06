import React from 'react';
import InnerHtml from '../InnerHtml';

const ReactNode = (props: any) => {
  const { schema, data, addons } = props;

  if (!schema) {
    return null;
  }

  // 当 data 为字符串时，直接返回
  if (typeof schema === 'string') {
    //  直接返回
    if (!schema.includes('method:')) {
      return <InnerHtml data={schema} />;
    }

    // 如果字符串中包含 render: 则调用 render 方法进行渲染
    const [_, funcName] = schema.split('method:');
    const renderFunc = addons.getMethod(funcName);
    return renderFunc(data);
  }

  // 当 data 为对象时，则调用 FRender 组件进行渲染
  return addons.renderer({ schema, data, addons });
};

export default ReactNode;
