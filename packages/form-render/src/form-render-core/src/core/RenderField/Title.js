import { Tooltip } from 'antd';
import React from 'react';
import { useStore2, useTools } from '../../hooks';
import { isCheckBoxType } from '../../utils';

const Description = ({ displayType, schema }) => {
  const { description, descType, descWidget } = schema;
  if (!description && !descWidget) return null;

  const { widgets } = useTools();

  const _description =
    typeof description === 'string' && /(^<|\/>)/.test(description) ? (
      <div dangerouslySetInnerHTML={{ __html: description }} />
    ) : (
      description
    );
  const RenderDesc = () => {
    const Widget = widgets[schema.descWidget];
    if (Widget) {
      return <Widget schema={schema} />;
    }
    return null;
  };

  switch (displayType) {
    case 'row':
      if (descType === 'widget') {
        return <RenderDesc />;
      }
      return (
        <Tooltip title={_description}>
          <i className="fr-tooltip-icon" />
        </Tooltip>
      );
    case 'inline':
      return null;
    default:
      if (descType === 'widget') {
        return <RenderDesc />;
      }
      if (descType === 'icon') {
        return (
          <Tooltip title={_description}>
            <i className="fr-tooltip-icon" />
          </Tooltip>
        );
      }

      return <span className="fr-desc ml2">{`( ${description} )`}</span>;
  }
};

const Title = ({
  labelClass,
  labelStyle,
  schema,
  displayType,
  renderTitle,
  requiredMark: globalRequiredMark,
}) => {
  const { displayType: globalDisplayType, readOnly, colon } = useStore2();
  const { title, required, type, requiredMark: schemaRequiredMark } = schema;
  const isObjType = type === 'object';

  let _displayType =
    schema.displayType || displayType || globalDisplayType || 'column';

  if (renderTitle) {
    return renderTitle({
      labelClass,
      labelStyle,
      schema,
      displayType: _displayType,
      readOnly,
      colon,
    });
  }

  const requiredMark =
    typeof schemaRequiredMark === 'undefined'
      ? globalRequiredMark
      : schemaRequiredMark;

  // 左侧的的 * 号提示
  let TitleRequiredMark = null;
  // 左侧的 option 提示
  let TitleTextMark = null;

  if (required) {
    /**
     * ant-design requiredMark 实现
     * https://ant.design/components/form-cn/
     */
    if (requiredMark !== false && requiredMark !== 'optional') {
      TitleRequiredMark = <span className="fr-label-required"> *</span>;
      TitleTextMark = null;
    }
  } else {
    if (requiredMark === 'optional') {
      TitleRequiredMark = null;
      TitleTextMark = <span className="fr-label-required-text">（可选）</span>;
    }
  }

  // requiredMark 为 false 不展示必填符号
  if (requiredMark === false) {
    TitleRequiredMark = null;
    TitleTextMark = null;
  }

  return (
    <div className={labelClass} style={labelStyle}>
      {title ? (
        <label
          className={`fr-label-title ${
            isCheckBoxType(schema, readOnly) ||
            _displayType === 'column' ||
            !colon
              ? 'no-colon'
              : ''
          }`} // checkbox不带冒号
          title={title}
        >
          {TitleRequiredMark}
          <span
            className={`${isObjType ? 'b' : ''} ${
              _displayType === 'column' ? 'flex-none' : ''
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </span>
          {TitleTextMark}
          <Description schema={schema} displayType={_displayType} />
        </label>
      ) : null}
    </div>
  );
};

export default Title;
