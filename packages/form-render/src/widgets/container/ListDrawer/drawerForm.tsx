import React from 'react';
import { Drawer, Space, Button } from 'antd';
import FRender, { useForm } from '../../../index';

const DrawerForm = (props: any) => {
  const { schema , widgets, valueChange, onClose, data } = props;
  const form: any = useForm();

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
      title='操作'
      visible={true}
      open={true}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button type='primary' onClick={form.submit}>
            确定
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