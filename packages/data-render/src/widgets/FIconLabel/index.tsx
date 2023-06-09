import React from 'react';
import IconLabel from '../components/IconLabel';

const FIconLabel = (props: any) => {
  const {
    data,
    leftText,
    rightText,
    icon,
    method,
    href,
    target = '_blank',
    addons,
    ...otherProps
  } = props;

  const parentData = addons.getParentData();
  const dataKey = addons.dataKey;

  const handleClick = async (ev: any) => {
    if (href) {
      if (target === '_self') {
        window.location.href = href;
      } else {
        window.open(href);
      }
      return;
    }
    // 传人外置方法，实现按钮点击事件
    const func = addons.getMethod(method?.name || method);
    func({ dataKey, method, data: parentData }, ev);
  };

  return (
    <IconLabel
      onClick={handleClick}
      data={`${leftText || ''} ${data} ${rightText || ''}`}
      {...otherProps}
      {...icon}
      iconFontUrl={addons.getConfig().iconFontUrl}
    />
  );
};

export default FIconLabel;
