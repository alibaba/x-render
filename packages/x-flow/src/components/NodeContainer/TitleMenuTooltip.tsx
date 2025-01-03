import React, { useMemo } from 'react';
import createIconFont from '../../utils/createIconFont';

const TitleMenuTooltip = ({ icon, nodeSettingTitle, description, iconFontUrl, iconSvg }: any) => {
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  return (
    <div className='xflow-node-title-menu-tooltip'>
      <div className='header-wrap'>
      <div className='icon-box-max' style={{ background: icon?.bgColor || '#F79009', marginRight: '8px' }}>
        {iconSvg ? iconSvg :<IconBox type={icon?.type} style={{ color: '#fff', fontSize: 13, ...icon?.style }} />}
      </div>
      <div className='title'>
          {nodeSettingTitle}
        </div>
      </div>
      <div className='description'>
        {description}
      </div>
    </div>
  )
};

export default TitleMenuTooltip;
