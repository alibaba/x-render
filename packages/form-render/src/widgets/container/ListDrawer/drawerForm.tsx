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
    form.submit();
  };

  return (
    <Drawer
      width={600}
      title='操作'
      visible={true}
      open={true}
      onClose={handleClose}
      extra={
        <Button type='primary' onClick={form.submit}>
          确定
        </Button>
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