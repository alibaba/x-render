import React from "react";
import { Button, Radio } from "antd";


const TitleView = ({ title, ...rest }: any) => {
  const { tableState, setTable, doSearch, getState } = rest;
  const { tab, api } = getState();
  const _tab = tab || 0;

  
  const onTabChange = (e: any) => {
    if (rest.onTabChange && typeof rest.onTabChange === 'function') {
      return rest.onTabChange(e);
    }
    const _tab = e.target.value;
    setTable({ tab: _tab });
    doSearch({ tab: _tab });
  };

  if (typeof api === 'function')
    return <div className="tr-single-tab">{title}</div>;
  if (api && Array.isArray(api)) {
    if (api.length === 1)
      return <div className="tr-single-tab">{api[0].name}</div>;
    return (
      <>
        <Radio.Group onChange={onTabChange} value={_tab}>
          {api.map((item, i) => {
            return (
              <Radio.Button key={i.toString()} value={i}>
                {item.name}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        {title && <div className="tr-extra-tab">{title}</div>}
      </>
    );
  }
  return <div className="tr-single-tab" />; // 给一个空的占位
};

export default TitleView;
