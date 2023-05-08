import React, { useState} from 'react';
import { Form, Popover } from 'antd';

const TableCell = (props: any) => {
  const { renderCore, schema, dataIndex, ...otherProps } = props;
  const [errorMsg, setErrorMsg] = useState(null);

  const onStatusChange = (_: any, errors: any[]) => {
    const message = errors[0] || null;
    setErrorMsg(message);
  };

  if (!schema.properties[dataIndex].onStatusChange) {
    schema.properties[dataIndex].onStatusChange = onStatusChange;
  }

  const popoverProps = {
    visible: !!errorMsg
  }

  return (
    <Form.Item>
      <Popover
        overlayClassName='fr-popover-error'
        content={errorMsg}
        placement='topRight'
        trigger='focus'
        open={!!errorMsg}
        {...popoverProps}
      >
        {renderCore({ ...otherProps, schema })}
      </Popover>
    </Form.Item>
  );
};

export default TableCell;
