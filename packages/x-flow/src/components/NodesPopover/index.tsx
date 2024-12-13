import { useClickAway } from 'ahooks';
import { Popover } from 'antd';
import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ConfigContext } from '../../models/context';
import NodesMenu from '../NodesMenu';

export default forwardRef((props: any, popoverRef) => {
  const { addNode, children, onNodeSelectPopoverChange } = props;

  const ref = useRef<any>(null);
  const closeRef: any = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { settings, nodeSelector } = useContext(ConfigContext);
  const { showSearch, popoverProps = { placement: 'top' } } =
    nodeSelector || {};

  useImperativeHandle(popoverRef, () => ({
    changeOpen: val => {
      setOpen(val);
    },
  }));

  useClickAway(() => {
    if (closeRef.current) {
      setOpen(false);
      onNodeSelectPopoverChange && onNodeSelectPopoverChange(false);
      closeRef.current = false;
    }
  }, ref);

  const handCreateNode = useCallback<any>(({ type }) => {
    addNode({ _nodeType: type });
    setOpen(false);
    onNodeSelectPopoverChange && onNodeSelectPopoverChange(false);
  }, []);

  return (
    <Popover
      getPopupContainer={() => document.getElementById('xflow-container')}
      zIndex={2000}
      arrow={false}
      overlayInnerStyle={{ padding: '12px 6px' }}
      {...popoverProps}
      trigger="click"
      open={open}
      onOpenChange={() => {
        setTimeout(() => {
          closeRef.current = true;
          setOpen(true);
        }, 50);
      }}
      content={
        <NodesMenu
          ref={ref}
          items={settings}
          showSearch={showSearch}
          onClick={handCreateNode}
        />
      }
    >
      {children}
    </Popover>
  );
});
