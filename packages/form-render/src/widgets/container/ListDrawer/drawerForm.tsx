import React from 'react';
import { Drawer, Space, Button } from 'antd';
import FRender, { useForm } from '../../../index';
import { useTranslation } from 'react-i18next';

const DrawerForm = (props: any) => {
  const { schema, widgets, valueChange, onClose, data } = props;
  const form: any = useForm();
  const { t } = useTranslation()

  const handleFinish = (data: any) => {
    valueChange(data);
    onClose();
  };

  const handleClose = () => {
    form.validateFields().then(() => {
      onClose();
    }).catch(() => {
      const flag = !data;
      onClose(flag);
    })
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
          <Button onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button type='primary' onClick={form.submit}>
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
}

export default DrawerForm;