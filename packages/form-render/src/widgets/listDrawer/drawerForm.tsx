import React, { useContext } from 'react';
import { Button, Drawer, Space, ConfigProvider } from 'antd';
import { translation } from '../utils';

const DrawerForm = (props: any) => {
  const { children, onConfirm, onClose, ...ret } = props;

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  let extraProps: any = { ...ret, open: true };
  if ((window as any).antdVersion === 'v4') {
    extraProps = { ...ret, visible: true };
  }

  return (
    <Drawer
      width={600}
      title={t('operate')}
      {...extraProps}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>{t('cancel')}</Button>
          <Button type="primary" onClick={onConfirm}>
            {t('confirm')}
          </Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

export default DrawerForm;
