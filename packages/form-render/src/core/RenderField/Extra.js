import React from 'react';
import { useTools } from '../../hooks';
import './Extra.less';

const Extra = ({ schema }) => {
  const extra = schema.props?.extra;

  if(!extra) return null;

  const { widgets } = useTools();
  const widgetName = extra?.widget;
  const Widget = widgets[widgetName];

  if(Widget) return <Widget schema={schema}/>;

  let __html = '';

  if(typeof extra === 'string') {
    __html = extra;
  }
  if(typeof extra?.text === 'string') {
    __html = extra.text;
  }
  return __html && <div className="fr-form-item-extra" dangerouslySetInnerHTML={{ __html }}></div>
};

export default Extra;
