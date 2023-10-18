import React, { useContext } from 'react';
import { Button, Space, ConfigProvider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { translation } from '../../utils'

const ActionView = (props: any) => {
  const {
    onReset,
    searchBtnRender,
    style,
    className,
    form,
    searchText,
    resetText,
    hasCollapse,
    setLimitHeight,
    setExpand,
    isExpand,
    loading,
    retainBtn,
    mode,
  } = props;

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const handleReset = () => {
    if (onReset) {
      onReset(form);
      return;
    }
    form.resetFields();
    form.submit();
  };

  const handleCollapse = () => {
    setExpand(!isExpand);
  };

  const searchBtnArr = typeof searchBtnRender === 'function' ? searchBtnRender(form.submit, handleReset, { loading }) : [];

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

  const submitShow = (mode === 'simple' && (typeof retainBtn === 'boolean' || retainBtn?.includes('submit')) || mode !== 'simple');
  const resetShow = (mode === 'simple' && (typeof retainBtn === 'boolean' || retainBtn?.includes('reset')) || mode !== 'simple');

  return (
    <div
      className={`flex justify-end w-100 ${className || ''}`}
      style={style}
    >
      <Space>
        {submitShow && <Button loading={loading} type='primary' onClick={form.submit}>{searchText}</Button>}
        {resetShow && <Button onClick={handleReset}>{resetText}</Button>}
        {hasCollapse && (
          <a onClick={handleCollapse} style={{ cursor: 'pointer' }}>
            {isExpand ? (
              <>
                {t('fold')}
                <UpOutlined />
              </>
            ) : (
              <>
                {t('expand')}
                <DownOutlined />
              </>
            )}
          </a>
        )}
      </Space>
    </div>
  );
}

export default ActionView;
