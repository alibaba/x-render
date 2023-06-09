import React from 'react';
import classnames from 'classnames';

const InnerHtml = (props: any) => {
  const { data, style, className } = props;

  if (typeof data === 'object') {
    return null;
  }

  return (
    <span
      className={classnames(null, { [className]: className })}
      style={style}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
};

export default InnerHtml;
