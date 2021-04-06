import React from 'react';

const FoldIcon = ({
  fold = false,
  width,
  height,
  fill,
  style = {},
  ...rest
}) => (
  <div
    style={style}
    className={fold ? 'fold-icon' : 'fold-icon fold-icon-active'}
    {...rest}
  >
    <svg viewBox="0 0 1024 1024" width={width || 18} height={height || 18}>
      <path
        d="M942.048 306.176c-12.288-12.288-31.328-13.024-43.008-2.016L529.056 674.112c-15.072 15.872-19.008 15.808-34.816 0L124.288 304.16c-11.68-11.04-30.72-10.272-43.008 2.016-12.512 12.512-13.216 32.032-1.6 43.68L490.624 760.8c5.056 5.056 11.648 7.328 18.464 7.744h5.152c6.816-.448 13.408-2.72 18.464-7.744l410.944-410.944c11.584-11.648 10.88-31.2-1.6-43.68z"
        fill={fill || '#3c3c3c'}
      />
    </svg>
  </div>
);

export default FoldIcon;
