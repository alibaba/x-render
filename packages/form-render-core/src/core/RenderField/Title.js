import React from 'react';
import { useStore2 } from '../../hooks';
import { isCheckBoxType } from '../../utils';

const Title = ({ labelClass, labelStyle, schema, displayType }) => {
  const { displayType: globalDisplayType, readOnly } = useStore2();
  const { title, description, required, type } = schema;
  const isObjType = type === 'object';

  let _displayType =
    schema.displayType || displayType || globalDisplayType || 'column';

  return (
    <div className={labelClass} style={labelStyle}>
      {title ? (
        <label
          className={`fr-label-title ${
            isCheckBoxType(schema, readOnly) || _displayType === 'column'
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
          {description &&
            (_displayType === 'row' ? (
              <span className="fr-tooltip-toggle" aria-label={description}>
                <i className="fr-tooltip-icon" />
                <div className="fr-tooltip-container">
                  <i className="fr-tooltip-triangle" />
                  {description}
                </div>
              </span>
            ) : _displayType === 'inline' ? null : (
              <span className="fr-desc ml2">(&nbsp;{description}&nbsp;)</span>
            ))}
        </label>
      ) : null}
    </div>
  );
};

export default Title;
