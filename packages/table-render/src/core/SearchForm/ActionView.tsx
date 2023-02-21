import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const ActionView = (props: any) => {
  const {
    searchBtnRender,
    style,
    className,
    form,
    searchText,
    resetText,
    collapsed,
    setLimitHeight,
    loading
  } = props;

  const [expand, setExpand] = useState(false);

  const handleReset = () => {
    form.resetFields();
    form.submit();
  };

  const handleCollapse = () => {
    const flag = !expand;
    setExpand(flag)
    setLimitHeight(flag);
  }

  const searchBtnArr = typeof searchBtnRender === 'function' ? searchBtnRender(form.submit, handleReset) : [];

  if (searchBtnRender) {
    return (
      <div className='flex justify-end w-100'>
        {Array.isArray(searchBtnArr) &&
          searchBtnArr.map((ui, idx) => {
            return (
              <div key={idx.toString()} style={{ marginLeft: 8 }}>
                {ui}
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div
      className={`flex justify-end w-100 ${className || ''}`}
      style={style}
    >
      <Space>
        <Button loading={loading} type='primary' onClick={form.submit}>{searchText}</Button>
        <Button onClick={handleReset}>{resetText}</Button>
        {collapsed && (
          <a onClick={handleCollapse}>
            {expand ? (
              <>
                展开
                <DownOutlined />
              </>
            ) : (
              <>
                收起
                <UpOutlined />
              </>
            )}
          </a>
        )}
      </Space>
    </div>
  );
}

export default ActionView;
