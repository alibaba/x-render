import React, { useContext } from 'react';
import { Button, Drawer, Space, ConfigProvider } from 'antd';
import { translation } from '../utils';

const DrawerForm = (props: any) => {
  const { children, onConfirm, onClose, DrawerProps } = props;

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  let drawerProps: any = { ...DrawerProps, open: true };
  if ((window as any).antdVersion === 'v4') {
    drawerProps = { ...DrawerProps, visible: true };
  }

  return (
    <Drawer
      width={600}
      title={t('operate')}
      {...drawerProps}
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
