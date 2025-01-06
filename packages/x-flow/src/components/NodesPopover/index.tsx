import { useClickAway } from 'ahooks';
import { Popover } from 'antd';
import { isFunction } from 'lodash';
import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { uuid } from '../../utils';
import NodesMenu from '../NodesMenu';
import './index.less';

export default forwardRef((props: any, popoverRef) => {
  const { addNode, children, onNodeSelectPopoverChange } = props;
  const { setIsAddingNode } = useStore(s => ({
    setIsAddingNode: s.setIsAddingNode,
  }));
  const ref = useRef<any>(null);
  const closeRef: any = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { settings, nodeSelector, antdVersion ,readOnly ,clickAddNode,settingMap }: any = useContext(ConfigContext);
  const { showSearch, popoverProps = { placement: 'top' } } =
    nodeSelector || {};

  useImperativeHandle(popoverRef, () => ({
    changeOpen: openChange,
  }));

  useClickAway(() => {
    if (closeRef.current) {
      setOpen(false);
      onNodeSelectPopoverChange && onNodeSelectPopoverChange(false);
      closeRef.current = false;
    }
  }, ref);

  const handCreateNode = useCallback<any>(({ type }) => {
    if (isFunction(clickAddNode)) {
      clickAddNode(type,settingMap[type],( data = {} )=>{
        addNode({ _nodeType: type, ...data })
      });
    }else{
      if (type === 'Switch') {
        addNode({ _nodeType: type, list: [{ '_id':`${uuid()}`}] });
      } else if (type === 'Parallel') {
        addNode({ _nodeType: type, list: [{ _id: `id_${uuid()}` }, { _id: `id_${uuid()}` }] });
      } else {
        addNode({ _nodeType: type });
      }
    }

    setOpen(false);
    onNodeSelectPopoverChange && onNodeSelectPopoverChange(false);
  }, []);

  const openChange = () => {
    setTimeout(() => {
      setIsAddingNode(true);
      closeRef.current = true;
      if (!readOnly) {
        setOpen(true);
      }
    }, 50);
  };

  const popoverVersionProps = useMemo(() => {
    if (antdVersion === 'V5') {
      return {
        open,
        onOpenChange: openChange,
      };
    }
    // V4
    return {
      visible: open,
      onVisibleChange: openChange,
    };
  }, [open]);

  return (
    <Popover
      overlayClassName="nodes-popover"
      getPopupContainer={() => document.getElementById('xflow-container')}
      zIndex={2000}
      arrow={false}
      overlayInnerStyle={{ padding: '12px 6px' }}
      {...popoverProps}
      trigger="click"
      {...popoverVersionProps}
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
