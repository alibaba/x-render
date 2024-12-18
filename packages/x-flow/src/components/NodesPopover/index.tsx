import { useMemo } from 'react';
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
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import NodesMenu from '../NodesMenu';
import { getAntdVersion  } from '../../utils';
import './index.less';

export default forwardRef((props: any, popoverRef) => {
  const { addNode, children, onNodeSelectPopoverChange } = props;
  const { setIsAddingNode } = useStore(s => ({
    setIsAddingNode: s.setIsAddingNode,
  }));
  const ref = useRef<any>(null);
  const closeRef: any = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { settings, nodeSelector }: any = useContext(ConfigContext);
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

  const popoverVersionProps = useMemo(() => {
    const version = getAntdVersion();
    if (version === 'V5') {
      return {
        open,
      };
    }
    // V4
    return {
      visible: open,
    };
  }, [open]);

  return (
    <Popover
      overlayClassName='nodes-popover'
      getPopupContainer={() => document.getElementById('xflow-container')}
      zIndex={2000}
      arrow={false}
      overlayInnerStyle={{ padding: '12px 6px' }}
      {...popoverProps}
      trigger='click'
      {...popoverVersionProps}
      onOpenChange={() => {
        setTimeout(() => {
          setIsAddingNode(true);
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
