import React from "react";
import { Drawer, Form } from "antd";
import renderCore from "../../../render-core";

const FormDrawer = React.forwardRef<{
  open: (params: { name: number, value?: any }) => void,
}, {
  schema: any,
  listName: (string | number)[],
}>(({ schema, listName }, ref) => {

  const [visible, setVisible] = React.useState<boolean>(false);
  const nameRef = React.useRef(null);

  // create a new drawer form to sync values between table from and drawer form
  const [drawerForm] = Form.useForm();
  const tableForm = Form.useFormInstance();

  React.useImperativeHandle(ref, () => ({
    open: ({ name, value }) => {

      if (value) {
        drawerForm.setFieldsValue(value);
      } else {
        drawerForm.resetFields();
      }

      nameRef.current = name;
      setVisible(true);
    }
  }))

  return (
    <>
      <Drawer
        visible={visible}
        title="操作"
        onClose={() => setVisible(false)}
      >
        <Form
          layout="vertical"
          form={drawerForm}
          onValuesChange={(values) => {
            if (nameRef.current === null) return;

            const newFields = Object.keys(values).map(itemName => {
              const namePath = listName?.concat([nameRef.current, itemName]);
              return {
                name: namePath,
                value: values[itemName],
              }
            });

            tableForm.setFields(newFields);
          }}
        >
          {renderCore({ schema: schema.items })}
        </Form>
      </Drawer>
    </>
  )
})

export default FormDrawer;