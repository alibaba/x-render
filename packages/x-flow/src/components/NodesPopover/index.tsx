
import React, { useCallback, useState, useRef, useContext } from 'react';
import { Popover } from 'antd';
import { useClickAway } from 'ahooks';
import { ConfigContext } from '../../models/context';
import NodesMenu from '../NodesMenu';

export default (props: any) => {
  const { addNode,  children } = props;

  const ref = useRef<any>(null);
  const closeRef: any = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { settings, nodeSelector } = useContext(ConfigContext);
  const { showSearch, popoverProps = { placement: 'top' } } = nodeSelector || {};

  useClickAway(() => {
    if (closeRef.current) {
      setOpen(false);
      closeRef.current = false;
    }
  }, ref);

  const handCreateNode = useCallback<any>(({ type }) => {
    addNode({ _nodeType: type });
    setOpen(false);
  }, []);

  return (
    <Popover
      zIndex={2000}
      arrow={false}
      overlayInnerStyle={{ padding: '12px 6px' }}
      {...popoverProps}
      trigger='click'
      open={open}
      onOpenChange={() => {
        setTimeout(() => {
          closeRef.current = true;
          setOpen(true);
        }, 50)
      }}
      content={(
        <NodesMenu
          ref={ref}
          items={settings}
          showSearch={showSearch}
          onClick={handCreateNode}
        />
      )}
    >
      {children}
    </Popover>
  );
}
