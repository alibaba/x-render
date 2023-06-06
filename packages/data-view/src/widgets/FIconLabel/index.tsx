import React from 'react';
import IconLabel from '../components/IconLabel';

const FIconLabel = (props: any) => {
  const {
    data,
    dataKey,
    leftText,
    rightText,
    getParentData,
    icon,
    method,
    href,
    target = '_blank',
    storeMethod,
    ...otherProps
  } = props;

  const parentData = getParentData();

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
    const func = storeMethod.getMethod(method?.name || method);
    func({ dataKey, method, data: parentData }, ev);
  };

  return (
    <IconLabel
      onClick={handleClick}
      data={`${leftText || ''} ${data} ${rightText || ''}`}
      {...otherProps}
      {...icon}
      iconFontUrl={storeMethod.getConfig().iconFontUrl}
    />
  );
};

export default FIconLabel;
