import React, { FC, useMemo, } from 'react';
import { Checkbox, } from 'antd';
import { HolderOutlined, PushpinOutlined, } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTableStore } from '../../../store';
import clx from 'classnames';
import './index.less';
import { getColumnKey } from '../../../../utils';
import { getStatus, Setting } from './utils';

const prefix = 'tr-toolbar-column-setting-item';

const Item: FC<Setting[number] & {
  columnKey: string,
  isOverlay?: boolean,
  isChecked?: boolean,
  onFixItem?: (columnKey: string) => void,
  onUnfixItem?: (columnKey: string) => void,
}> = (props) => {
  const { columnKey, isChecked, isOverlay, onFixItem, onUnfixItem } = props;
  const { setNodeRef, attributes, listeners, transition, transform, isDragging, setActivatorNodeRef } = useSortable({
    id: columnKey,
  });

  const columns = useTableStore(store => store.columns);
  const columnsSetting = useTableStore(store => store.columnsSetting);

  const {
    isFirstOne,
    isLastOne,
    isFixed,
    preFixed,
    nextFixed
  } = useMemo(
    () => getStatus(columnsSetting, columnKey),
    [columnsSetting, columnKey]
  );

  const canFix = isFirstOne || isLastOne || preFixed || nextFixed;

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? '0.6' : 'unset',
  };

  // TODO 测试下函数的场景
  const title = columns.find((i, index) => getColumnKey(i, index) === columnKey).title;
  const label = useMemo(() => typeof title === 'function' ? title({}) : title, [title]);

  /** 取消固定当前项 */
  const onCancelFix = () => {
    if (!canFix) return;
    onUnfixItem?.(columnKey);
  }

  /** 固定当前项 */
  const onFix = () => {
    if (!canFix) return;
    onFixItem?.(columnKey);
  }

  const className = clx({
    [`${prefix}-can-fixed`]: canFix,
  })

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={className}
      {...attributes}
    >
      <HolderOutlined
        {...listeners}
        ref={setActivatorNodeRef}
        style={{
          marginRight: 8,
          color: '#666',
          cursor: isOverlay ? 'grabbing' : 'grab'
        }}
      />
      {isOverlay ? (
        <Checkbox checked={isChecked}>{label}</Checkbox>
      ) : (
        <Checkbox value={columnKey}>{label}</Checkbox>
      )}
      <PushpinOutlined
        className={`${prefix}-pin`}
        onClick={isFixed ? onCancelFix : onFix}
      />
    </div>
  )
}

export default Item;
