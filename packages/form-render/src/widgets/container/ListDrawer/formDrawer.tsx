import React from "react";
import { FormListFieldData, Drawer, Form } from "antd";
import renderCore from "../../../render-core";
import { FormContext } from "../../../utils/context";

const FormDrawer: React.FC<{
  children: React.ReactNode,
  schema: any,
  field: FormListFieldData,
  listName: string,
}> = ({ children, schema, field, listName }) => {

  const [visible, setVisible] = React.useState(false);
  const { form } = React.useContext(FormContext) as any;

  return (
    <>
      <div onClick={() => setVisible(true)}>
        {children}
      </div>
      <Drawer
        visible={visible}
        title="操作"
        onClose={() => setVisible(false)}
      >
        <Form onValuesChange={(value) => {
          const name = Object.keys(value)[0];
          form.setFields([
            {
              name: [listName, field.name, name],
              value: value[name]
            }
          ])
        }}>
          {renderCore({ schema: schema.items, parentNamePath: [field.name] })}
        </Form>
      </Drawer>
    </>
  )
}

export default FormDrawer;