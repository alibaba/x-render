import React from 'react';
import classnames from 'classnames';
import createIconFont from '../../utils/createIconFont';

import './index.less';

const IconLabel = (props: any) => {
  const {
    data,
    onClick,
    type,
    className,
    style,
    contentStyle,
    iconStyle,
    direct = 'right',
    fontSize,
    color,
    iconFontUrl,
  } = props;

  const Icon = createIconFont(iconFontUrl);

  const IconView = <Icon type={type} style={{ fontSize, color, ...iconStyle }} onClick={onClick} />;

  return (
    <span
      className={classnames('custom-icon-label-view', { [className]: className })}
      style={style}
    >
      {direct === 'left' && IconView}
      <span className="content" style={contentStyle}>
        {data}
      </span>
      {direct === 'right' && IconView}
    </span>
  );
};

export default IconLabel;
