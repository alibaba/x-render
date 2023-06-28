import React from 'react';
import classnames from 'classnames';
import createIconFont from '../../utils/createIconFont';
import { renderString } from '../../utils/common';
import CopyLabel from '../CopyLabel';
import './index.less';

interface IIcon {
  text: string;
  type: string;
  style?: any;
  showText?: boolean;
  className?: string | any;
}
interface IProps {
  className?: string | any;
  label?: string;
  icon?: IIcon;
  data?: string;
  copy?: boolean;
  onClick?: () => void;
  iconFontUrl: string;
}

const Encryption = (props: IProps) => {
  const { className, label, icon, data, copy = true, onClick, iconFontUrl } = props;
  const {
    text = '查看电话',
    showText = true,
    type = 'icon-phone',
    style: iconStyle,
    className: iconClass,
  } = icon || {};

  const Icon = createIconFont(iconFontUrl);

  return (
    <div className={classnames('encryption-view', { [className]: className })}>
      {label && <span className='line-label'>{renderString(label)}</span>}
      {data &&
        (copy ? (
          <CopyLabel data={data} iconFontUrl={iconFontUrl} />
        ) : (
          <span className='encry-content'>{data}</span>
        ))}
      {!data && (
        <span onClick={onClick} className={classnames('line-span', { [iconClass]: iconClass })}>
          {type && <Icon type={type} style={{ color: '#1677FF', fontSize: 18, ...iconStyle }} />}
          {showText && <span className='icon-text'>{text}</span>}
        </span>
      )}
    </div>
  );
};

export default Encryption;
