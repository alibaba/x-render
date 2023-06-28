import React from 'react';
import { Timeline } from 'antd';
import { combineClass } from '../utils/common';
import FTitle from '../FTitle';

const FTimeline = (props: any) => {
  const { data = [], title, className, style, lineItem = {}, addons, ...otherProps } = props;
  const {
    timeKey = 'time',
    contenKey = 'content',
    colorKey = 'color',
    ...otherLineItem
  } = lineItem;

  return (
    <>
      <FTitle data={title} />
      <Timeline className={combineClass('dr-timeline', className)} style={style} {...otherProps}>
        {(data || []).map((item: any = {}, index: number) => (
          <Timeline.Item key={index} {...otherLineItem} color={item[colorKey] || 'gray'}>
            <span className="line-item-time">{item[timeKey]}</span>
            <span className="line-item-content">{item[contenKey]}</span>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};

export default FTimeline;
