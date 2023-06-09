import React from 'react';

import IconLabel from '../IconLabel';
import { clipboardCopy } from '../../utils/common';
import './index.less';

const CopyLabel = (props: any) => {
  const { onClick, style, data, fontSize = 22, color = '#1677FF' } = props;

  const handleClick = (ev: any) => {
    if (onClick) {
      onClick(ev);
      return;
    }
    clipboardCopy(data);
    ev.stopPropagation();
  };

  if (!data) {
    return null;
  }

  return (
    <IconLabel
      type="icon-copy"
      fontSize={fontSize}
      color={color}
      style={style}
      data={data}
      onClick={handleClick}
    />
  );
};

export default CopyLabel;
