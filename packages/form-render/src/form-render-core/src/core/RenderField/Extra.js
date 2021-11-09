import React from 'react';
import { useTools } from '../../hooks';
import './Extra.less';

const Extra = ({ schema }) => {
  const { extra } = schema;
  const { widgets } = useTools();

  if (!extra) return null;

  // widget 这个api也可以不对外
  const widgetName = extra.widget;
  const Widget = widgets[widgetName];
  if (Widget) return <Widget schema={schema} />;

  let __html = '';
  if (typeof extra === 'string') {
    __html = extra;
  }
  // 内部BU使用的口子，这个api不对外，也没有必要
  if (typeof extra === 'object' && extra.text) {
    __html = extra.text;
  }
  return (
    __html && (
      <div
        className="fr-form-item-extra"
        dangerouslySetInnerHTML={{ __html }}
      ></div>
    )
  );
};

export default Extra;
