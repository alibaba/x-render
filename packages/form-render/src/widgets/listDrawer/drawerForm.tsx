import React, { useContext } from 'react';
import { Button, Drawer, Space, ConfigProvider } from 'antd';
import FRender, { useForm } from '../../index';
import { translation } from '../utils';

const DrawerForm = (props: any) => {
  const { schema, widgets, onClose, data, configContext } = props;

  const form: any = useForm();
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const handleFinish = (data: any) => {
    onClose(data);
  };

  const handleClose = () => {
    onClose();
  };

  let drawerProps: any = {
    open: true
  };
  if ((window as any).antdVersion === 'v4')  {
    drawerProps = {
      visible: true
    };
  }

  return (
    <Drawer
      {...drawerProps}
      width={600}
      title={t('operate')}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button type="primary" onClick={form.submit}>
            {t('confirm')}
          </Button>
        </Space>
      }
    >
      <FRender
        schema={schema.items}
        initialValues={data}
        form={form}
        labelCol={{ span: 8 }}
        widgets={widgets}
        onFinish={handleFinish}
        locale={configContext?.locale}
        maxWidth='auto'
      />
    </Drawer>
  );
}

export default DrawerForm;
