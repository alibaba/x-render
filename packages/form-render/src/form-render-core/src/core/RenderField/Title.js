import { Tooltip } from 'antd';
import React from 'react';
import { useStore2 } from '../../hooks';
import { isCheckBoxType } from '../../utils';

const Description = ({ displayType, schema }) => {
  const { description, descType } = schema;
  if (!description) return null;

  switch (displayType) {
    case 'row':
      return (
        <Tooltip title={description}>
          <i className="fr-tooltip-icon" />
        </Tooltip>
      );
    case 'inline':
      return null;
    default:
      if (descType === 'icon') {
        return (
          <Tooltip title={description}>
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
}) => {
  const { displayType: globalDisplayType, readOnly, colon } = useStore2();
  const { title, required, type } = schema;
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
          {required === true && <span className="fr-label-required"> *</span>}
          <span
            className={`${isObjType ? 'b' : ''} ${
              _displayType === 'column' ? 'flex-none' : ''
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </span>
          <Description schema={schema} displayType={_displayType} />
        </label>
      ) : null}
    </div>
  );
};

export default Title;
