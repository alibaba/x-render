import React, { useState, useRef } from 'react';
import { Popover } from 'antd';

const VirtualCell = (props: any) => {
  const { renderCore, schema, dataIndex, ...otherProps } = props;
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState<boolean>();
  const mouseRef = useRef<any>();

  const onStatusChange = (_: any, errors: any[]) => {
    const message = errors[0] || null;
    setErrorMsg(message);
   
    if (mouseRef.current && message) {
      setVisible(true);
    }
  };

  if (!schema.properties[dataIndex].onStatusChange) {
    schema.properties[dataIndex].onStatusChange = onStatusChange;
  }

  return (
    <div 
      onMouseEnter={() => {
        mouseRef.current = true;
        setVisible(true);
      }}
      onMouseLeave={() => {
        mouseRef.current = false;
        setVisible(false);
      }}
    >
      <Popover
        overlayClassName='fr-popover-error'
        content={errorMsg}
        placement='topRight'
        open={visible && errorMsg}
      >
        {renderCore({ ...otherProps, schema })}
      </Popover>
    </div>
  );
};

export default VirtualCell;
