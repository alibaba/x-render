import React from 'react';
import { combineClass } from '../utils/common';
import FTitle from '../FTitle';
import './index.less';

const FTimeline = (props: any) => {
  const { data, title, className } = props;

  return (
    <>
      <FTitle data={title} />
      <div className={combineClass('dtv-progress', className)}>
        {data.map((item: any, index: number) => (
          <div
            key={item.content}
            className={combineClass('step-item', null, { 'step-item-active': true })}
            style={data.length - 1 === index ? { border: 'none' } : {}}
          >
            <div className="step-time">{item.time}</div>
            <div className="step-title">{item.content}</div>
            <div className="step-dot"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FTimeline;
