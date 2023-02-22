import React from 'react';
import { Radio } from 'antd';
import { isFunction, isArray } from '../../utils';

const TitleView = (props: any) => {
  const { title, request, setState, doSearch, onTabChange, currentTab } = props;
  const tabIndex = currentTab || 0;

  const handleTabChange = (ev: any) => {
    const _tabIndex = ev.target.value;
    if (isFunction(onTabChange)) {
      return onTabChange(_tabIndex, ev);
    }
    setState({ tab: _tabIndex });
    doSearch({ tab: _tabIndex });
  };

  if (isArray(request) && request.length > 1) {
    return (
      <>
        <Radio.Group onChange={handleTabChange} value={tabIndex}>
          {request.map((item: any, index: any) => {
            return (
              <Radio.Button key={index.toString()} value={index}>
                {item.name}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        {title && <div className='tr-extra-tab'>{title}</div>}
      </>
    );
  }

  let content = title;
  if (isArray(request)) {
    content = request[0].name;
  }
  return <div className='tr-single-tab'>{content || ''}</div>;
};

export default TitleView;
