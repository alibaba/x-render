import React from 'react';
import { Button, Space } from 'antd';
import { useTable } from '../hooks';

const ActionView = (props: any) => {
  const {
    searchBtnRender,
    style,
    className,
    form,
    searchText,
    resetText
  } = props;

  const { tableState = {} }: any = useTable();
  const { loading } = tableState;

  const handleReset = () => {
    form.resetFields();
    form.submit();
  };

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
      </Space>
    </div>
  );
}

export default ActionView;