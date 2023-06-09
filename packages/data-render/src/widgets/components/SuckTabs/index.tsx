import React, { FC, useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { throttle } from 'lodash-es';

import './index.less';

let activeIndx = 0; // 当前tab下标
let lockScroll = false; // 不做滚动判断
let isSubTop = false; // 是否吸顶

interface ITabItem {
  code: string;
  title: string;
  action?: string;
}

const SuckTabs: FC<any> = (props) => {
  const { tabs, tabsId = 'tab', startY = -10, children, className, style, fixed } = props;

  const scrollContainer = props.scrollContainer || window;

  const [tabIndex, setIndex] = useState<number>(0);
  const containerRef = useRef(null);
  const tabRef = useRef(null);
  const seatRef = useRef(null);

  useEffect(() => {
    scrollContainer.addEventListener('scroll', onScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    fixedChange(fixed);
  }, []);

  const getScrollParams = () => {
    let scrollContainerHeight =
      document.documentElement?.clientHeight || document.body?.clientHeight;
    let scrollTop =
      document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    if (props.scrollContainer) {
      scrollContainerHeight = scrollContainer?.clientHeight;
      scrollTop = scrollContainer.scrollTop;
    }
    return { scrollContainerHeight, scrollTop };
  };

  const onScroll = throttle(() => {
    const { scrollContainerHeight, scrollTop } = getScrollParams();

    const contaCurrent: any = containerRef.current;
    const offsetTop = contaCurrent.offsetTop;

    /** 还未滚到此块区域，不做处理 */
    if (scrollContainerHeight + scrollTop < offsetTop) {
      return;
    }
    isSubTop = offsetTop <= scrollTop - 1; // 是否吸顶

    // 处理吸顶
    fixedChange(isSubTop || fixed);

    // 手动点击，不处理滑动逻辑
    if (lockScroll) {
      return;
    }

    // 距离底部的长度
    const distance =
      Math.ceil((scrollContainer.scrollHeight - scrollContainerHeight - scrollTop) / 10) || 1;

    // 进行位置 tab 选中标记
    for (let i = tabs.length - 1; i > -1; i--) {
      const { code } = tabs[i];
      let scrollH = document.getElementById(`${tabsId}-${code}`)?.offsetTop ?? 0;
      if (isSubTop) {
        scrollH -= startY;
      }

      if (scrollH <= scrollTop) {
        // 滚动距离不够的时候，进行移位处理
        if (tabs.length - i > distance) {
          const idx = tabs.length - distance;
          if (activeIndx !== idx) {
            activeIndx = idx;
            setIndex(idx);
          }
        } else if (activeIndx !== i) {
          activeIndx = i;
          setIndex(i);
        }
        break;
      }
    }
  }, 100);

  /** tab 吸顶处理 */
  const fixedChange = (flag: boolean) => {
    const tabElement: any = tabRef.current;
    const seatElement: any = seatRef.current;

    if (flag) {
      seatElement.style.display = 'block';
      tabElement.classList.add('tab-suction');
    } else {
      seatElement.style.display = 'none';
      tabElement.classList.remove('tab-suction');
    }
  };

  // tab点击，滚动定位相应模块位置
  const handleTabClick = (index: number) => () => {
    // 标记当前锚点模块序号
    activeIndx = index;

    // 滚动锁死，防止触发滚动计算逻辑
    lockScroll = true;

    // 获取目标容器距离顶部高度， 高度 - 10 优化定位间隙
    const { code } = tabs[index];
    let scrollH = (document.getElementById(`${tabsId}-${code}`)?.offsetTop ?? 0) - startY;

    // 进行定位
    scrollContainer.scrollTo(0, scrollH);
    setIndex(index);

    // 释放死锁，后续触发滚动能够正常计算
    setTimeout(() => {
      lockScroll = false;
    }, 500);
  };

  return (
    <div
      className={classnames('dv-suck-nav', { [className]: className })}
      ref={containerRef}
      style={style}
    >
      <div className="seat-view" ref={seatRef} />
      <div className="tabs-view" ref={tabRef}>
        {tabs.map((tab: ITabItem, index: number) => (
          <div
            key={tab.code}
            className={classnames(tab.code, {
              'tab-item': true,
              'tab-active': index === tabIndex,
            })}
            onClick={handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {tabs.map((tab: ITabItem, index: number) => (
        <div key={`${tabsId}-${tab.code}`} id={`${tabsId}-${tab.code}`} className="tab-row">
          {children[index]}
        </div>
      ))}
    </div>
  );
};

export default SuckTabs;
