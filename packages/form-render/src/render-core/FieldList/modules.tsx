import React from "react";

export const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
};

export const getFormListLayout = (getValueFromKey: any, displayType: string) => {
  const _labelCol = getValueFromKey('labelCol');
  const _fieldCol = getValueFromKey('fieldCol');
  const labelWidth = getValueFromKey('labelWidth')

  let labelCol: any = { span: 5 };
  let fieldCol: any = { flex: 1 };

  if (labelWidth && displayType !== 'column') {
    labelCol = { flex : labelWidth + 'px' };
  }

  if (_labelCol) {
    labelCol = _labelCol;
  }

  if (_fieldCol) {
    fieldCol = _fieldCol;
  }

  if (typeof _labelCol === 'number') {
    labelCol = { span: _labelCol };
  }

  if (typeof _fieldCol === 'number') {
    fieldCol = { span: _fieldCol };
  }

  return { labelCol, fieldCol };
};

export const getLabel = (schema: any, displayType: string, widgets: any) => {
  const { title, description, descWidget, labelWidget } = schema;
  const LabelNode = widgets[labelWidget];

  if (LabelNode) {
    return <LabelNode schema={schema} />
  }

  if ((!description && !descWidget)) {
    return title;
  }

  const RenderDesc = () => {
    const Widget = widgets[descWidget];
    if (Widget) {
      return <Widget schema={schema} />;
    }

    if (description) {
      return (
        <span className='fr-desc'>
          ({description})
        </span>
      )
    }
    return null;
  };

  if (displayType === 'inline') {
    return title;
  }

  return (
    <>
      {title}
      <RenderDesc />
    </>
  )
};

export const getTooltip = (schema: any, displayType: string) => {
  const { descType, description, tooltip } = schema;

  if (tooltip) {
    if (typeof tooltip === 'string') {
      return { title: <span dangerouslySetInnerHTML={{ __html: tooltip }} /> };
    }

    return {
      ...tooltip,
      title: <span dangerouslySetInnerHTML={{ __html: tooltip.title }} />,
    };
  }

  if (descType === 'widget' || !description) {
    return null;
  }

  if (displayType === 'column' && descType === 'icon') {
    return {
      title: description
    }
  }

  return null;
};