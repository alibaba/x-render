import React, { FC, useMemo, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { useSet } from '../../utils/hooks';

import './index.less';
interface IProps {
  data: string;
  height: number;
  leftSlot?: JSX.Element | string;
  rightSlot?: JSX.Element | string;
  contentStyle?: any;
}

const initState = {
  hidden: true, // 先隐藏截取执行完成之后展示出来
  diff: 0,
  isEllipsis: true,
  isFirst: true, // 第一次
};

const TextEllipsis: FC<IProps> = (props) => {
  const { height, leftSlot, rightSlot, data, contentStyle } = props;

  const [state, setState] = useSet({
    cutText: data, // 截取后剩下的文字
    lastLength: data.length, // 上一次的长度
    ...initState,
  });

  const conRef = useRef(null);
  const { cutText, hidden, isEllipsis, lastLength, diff, isFirst } = state;

  useEffect(() => {
    const onsize = function () {
      setState({
        cutText: props.data,
        lastLength: props.data.length,
        ...initState,
      });
    };

    window.addEventListener('resize', onsize);
    return () => window.removeEventListener('resize', onsize);
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    setState({
      cutText: props.data,
      lastLength: props.data.length,
      ...initState,
    });
  }, [data]);

  useEffect(() => {
    // 无显示内容不处理
    if (!data) {
      return;
    }
    // 第一次已经处理过直接返回
    if (isFirst) {
      firstTimeRender();
      return;
    }
    // 进行截取处理
    const { clientHeight }: any = conRef.current || {};
    const cutTextLength = cutText.length;
    const length = Math.floor((cutTextLength - diff) / 2 + diff);

    // 真实高度超出固定高度,需要继续截取字符串
    if (clientHeight - height > 5) {
      setState({
        cutText: cutText.slice(0, length),
        lastLength: cutTextLength,
      });
      return;
    }
    // 找到合适值，终止遍历
    if (cutTextLength === diff) {
      setState({ hidden: false });
      return;
    }
    // 回退截取，找到一个合适值
    setState({
      diff: cutTextLength,
      cutText: data.slice(0, lastLength),
    });
  }, [cutText]);

  const firstTimeRender = () => {
    const { clientHeight }: any = conRef.current || {};
    const cutTextLength = cutText.length;
    // 真实高度超出固定高度,需要截取字符串
    if (clientHeight - height > 5) {
      setState({
        cutText: cutText.slice(0, cutTextLength / 2),
        lastLength: cutTextLength,
        isFirst: false,
      });
      return;
    }
    // 真实高度没有超出固定高度, 直接显示，不需要...
    setState({ isEllipsis: false, hidden: false });
  };

  return useMemo(() => {
    if (!data) {
      return null;
    }
    return (
      <div className="text-ellipsis-box" style={{ height: isEllipsis ? height : 'auto' }}>
        <div
          ref={conRef}
          className={classnames('text-ellipsis-view', { 'text-ellipsis-hidden': hidden })}
        >
          {isEllipsis ? (
            <>
              {leftSlot && <span>{leftSlot}</span>}
              <span style={contentStyle}>{`${cutText}...`}</span>
              <span className="text-ellipsis-all" onClick={() => setState({ isEllipsis: false })}>
                展开
              </span>
              {rightSlot && <span>{rightSlot}</span>}
            </>
          ) : (
            <>
              {leftSlot && <span>{leftSlot}</span>}
              <span style={contentStyle}>{data}</span>
              {data !== cutText && (
                <span className="text-ellipsis-all" onClick={() => setState({ isEllipsis: true })}>
                  收起
                </span>
              )}
              {rightSlot && <span>{rightSlot}</span>}
            </>
          )}
        </div>
      </div>
    );
  }, [cutText, hidden, isEllipsis]);
};

export default TextEllipsis;
