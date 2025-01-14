import { Tooltip, TooltipProps } from 'antd';
import React, { FC, memo, useEffect, useState } from 'react';
import './index.less';

interface ITextEllipsisProps {
  text: string;
  style?: object;
  className?: string;
  toolTipProps?: TooltipProps;
  type?: 'text' | 'paragraph';
  rows?: number;
}
const TextEllipsis: FC<ITextEllipsisProps> = ({
  text,
  style,
  toolTipProps,
  type = 'text',
  rows = 1,
  className,
}) => {
  const typographyRef = React.useRef<HTMLElement>(null);
  const [isEllipse, setIsEllipse] = useState(false);

  const component =
    type === 'paragraph' ? (
      <span
        ref={typographyRef}
        className={`paragraph-ellipsis ${className}`}
        style={{
          ...style,
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: rows,
        }}
      >
        {text}
      </span>
    ) : (
      <span
        ref={typographyRef}
        className={`text-ellipsis ${className}`}
        style={style}
      >
        {text}
      </span>
    );

  useEffect(() => {
    if (text) {
      if (type === 'paragraph') {
        const { offsetHeight, scrollHeight, clientHeight } =
          typographyRef.current;
        setIsEllipse(scrollHeight > clientHeight);
      } else {
        const isEllipse = isEleEllipsis(typographyRef?.current);
        setIsEllipse(isEllipse);
      }
    }
  }, [text]);

  const isEleEllipsis = (ele: HTMLElement): boolean => {
    const childDiv = document.createElement('em');
    ele.appendChild(childDiv);

    const rect = ele.getBoundingClientRect();
    const childRect = childDiv.getBoundingClientRect();

    ele.removeChild(childDiv);

    return (
      // Horizontal out of range
      rect.left > childRect.left ||
      childRect.right > rect.right ||
      // Vertical out of range
      rect.top > childRect.top ||
      childRect.bottom > rect.bottom
    );
  };
  if (isEllipse) {
    return (
      <Tooltip
        title={text}
        getPopupContainer={() =>
          document.getElementById('xflow-container') as HTMLElement
        }
        color="#ffff"
        overlayInnerStyle={{
          color: '#354052',
          fontSize: '12px',
          borderRadius: '8px',
        }}
        placement="bottomRight"
        {...toolTipProps}
      >
        {component}
      </Tooltip>
    );
  }
  return component;
};

export default memo(TextEllipsis);
