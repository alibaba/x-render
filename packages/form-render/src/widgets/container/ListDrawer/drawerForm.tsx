import { Button, Drawer, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FRender, { useForm } from '../../../index';

const DrawerForm = (props: any) => {
  const { schema, widgets, onClose, data } = props;
  const form: any = useForm();
  const { t } = useTranslation();

  const handleFinish = (data: any) => {
    onClose(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer
      width={600}
      title={t('operate')}
      visible={true}
      open={true}
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
        wrapperCol={{ flex: 1 }}
        widgets={widgets}
        onFinish={handleFinish}
      />
    </Drawer>
  );
};

export default DrawerForm;
