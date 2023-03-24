import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Tooltip, ConfigProvider, Dropdown, Checkbox, Divider, Button } from 'antd';
import { CloseOutlined, HolderOutlined, PushpinOutlined, SettingOutlined, UndoOutlined } from '@ant-design/icons';
import { translation } from '../../../../utils';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../../../store';
import { ProColumnsType } from '@/types';
import omit from 'lodash.omit';
import clx from 'classnames';
import './index.less';

const prefix = 'tr-toolbar-column-setting'

/**
 * 计算 fixed 方向
 * 
 * @param columns 列表
 * @param order 当前项的位置
 * 
 * @returns direction 固定的方向
 */
const getDirection = (columns: any[], order: number) => {
  const length = columns.length;
  const isFirstOne = order === 0;
  const isLastOne = order === length - 1;
  const haveForwardFixed = !isFirstOne && columns.find(i => i.order === order - 1).fixed;
  const haveNextFixed = !isLastOne && columns.find(i => i.order === order + 1).fixed;

  if (haveForwardFixed && !haveNextFixed && !isLastOne) {
    return columns.find(i => i.order === order - 1).fixed
  }

  if (!haveForwardFixed && haveNextFixed && !isFirstOne) {
    return columns.find(i => i.order === order + 1).fixed
  }

  if (!haveForwardFixed && !haveForwardFixed && !isFirstOne && !isLastOne) {
    return undefined;
  }

  if ((order + 1) > (length / 2)) {
    return 'right'
  } else {
    return 'left';
  }
}

/**
 * 计算新的 order
 * 
 * @param order 当前项的位置
 * @param newOrder 这次移动的项目的新位置
 * @param oldOrder 这次移动的项目的旧位置
 * 
 * @returns currentNewOrder 当前项的新位置 
 */
const getNewOrder = (order: number, newOrder: number, oldOrder: number) => {
  if (newOrder < oldOrder && order <= oldOrder && order >= newOrder) {
    return order + 1;
  }

  if (newOrder > oldOrder && order <= newOrder && order > oldOrder) {
    return order - 1
  }

  return order;
}

const Item: FC<ProColumnsType<any>[number] & {
  columnKey: string,
  isOverlay?: boolean,
  isChecked?: boolean,
}> = ({ title, columnKey, isOverlay = false, isChecked, fixed, order }) => {
  const { setNodeRef, attributes, listeners, transition, transform, isDragging, setActivatorNodeRef } = useSortable({
    id: columnKey,
  });

  const columns = useStore(store => store.columns);
  const setColumns = useStore(store => store.setColumns);

  const isFixed = !!fixed;
  const isFirstOne = order === 0;
  const isLastOne = order === columns.length - 1;
  const haveForwardFixed = !isFirstOne && columns.find(i => i.order === order - 1).fixed;
  const haveNextFixed = !isLastOne && columns.find(i => i.order === order + 1).fixed;
  const canFix = isFirstOne || isLastOne || haveForwardFixed || haveNextFixed;

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? '0.6' : 'unset',
  };

  // TODO 测试下函数的场景
  const label = useMemo(() => typeof title === 'function' ? title({}) : title, [title]);

  const onFixColumn = () => {
    if (!canFix) return;

    const newColumns = columns.map(i => {
      const isCurrentItem = i.key === columnKey;
      // 当前项取消固定时
      if (isCurrentItem && isFixed) {
        return omit(i, 'fixed');
      }

      // 当前项固定时
      if (isCurrentItem && !isFixed) {
        return {
          ...i,
          fixed: getDirection(columns, order),
        }
      }

      return i;
    })

    const finalColumns = newColumns.map(i => {
      if (i.fixed) {
        return {
          ...i,
          fixed: getDirection(newColumns, i.order),
        }
      } else {
        return i;
      }
    })
    setColumns(finalColumns);
  }

  const className = clx(`${prefix}-column`, {
    [`${prefix}-fixed-column`]: isFixed,
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
        onClick={onFixColumn}
      />
    </div>
  )
}

const ColumnSetting = () => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const columns = useStore((store) => store.columns);
  const setColumns = useStore(store => store.setColumns);

  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const inited = useRef(false);

  useEffect(() => {
    if (open && columns.length > 0 && !inited.current) {
      setValue(columns.filter(i => !i.hidden).map(i => i.key))
      inited.current = true;
      return;
    }

    if (!open) {
      inited.current = false;
      return;
    }
  }, [open, columns])

  const getItems = (columns: ProColumnsType<any>) => {
    if (!columns) return [];
    return [...columns]
      .sort((a, b) => a.order - b.order)
      .map(i => {
        return {
          label: <Item {...i} key={i.key} columnKey={String(i.key)} />,
          // must have a key
          key: i.key,
        }
      })
  }

  const onReset = () => {
    const originalColumns = columns.map((i, index) => ({
      ...i,
      order: index,
      hidden: false,
      fixed: undefined,
    }))
    setColumns(originalColumns);
    setValue(columns.map(i => i.key));
  }

  const onColumnsCheckChange = (val: string[]) => {
    const newColumns = columns.map(i => ({
      ...i,
      hidden: !val.includes(String(i.key))
    }))
    setValue(val);
    setColumns(newColumns);
  }

  const setColumnsOrder = (key: string, newOrder: number) => {
    const oldOrder = columns.find(i => i.key === key).order;
    if (oldOrder === newOrder) return;

    const newOrderColumns = columns.map(i => ({
      ...i,
      order: i.key === key ? newOrder : getNewOrder(i.order, newOrder, oldOrder),
    }))

    const newFixedColumns = newOrderColumns.map(i => ({
      ...i,
      fixed: i.fixed ? getDirection(newOrderColumns, i.order) : undefined,
    }))

    setColumns(newFixedColumns);
  }

  const items = useMemo(() => getItems(columns), [columns]);
  const activeItem = useMemo(() => columns.find(i => i.key === activeId), [columns, activeId]);
  const keyList = useMemo(() => [...columns].sort((a, b) => a.order - b.order).map(i => i.key), [columns]);

  console.log('columns', columns.map(i => i.fixed));
  return (
    <Dropdown
      menu={{ items }}
      open={open}
      trigger={['click']}
      onOpenChange={(open) => setOpen(open)}
      dropdownRender={(menu) => {
        return (
          <div className={prefix}>
            <div className={`${prefix}-header`}>
              <CloseOutlined
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 16,
                  color: '#999',
                  cursor: 'pointer'
                }}
              />
              <Button
                icon={<UndoOutlined />}
                type="primary"
                size="small"
                onClick={onReset}
              >
                重置
              </Button>
            </div>
            <Divider style={{ margin: 0 }} />
            <DndContext
              onDragEnd={({ over, active }) => {
                if (over) {
                  const activeId = columns.find(i => i.key === active.id).key;
                  const newOrder = columns.find(i => i.key === over.id).order;
                  setColumnsOrder(String(activeId), newOrder);
                }
              }}
              onDragStart={({ active }) => {
                setActiveId(String(active.id));
              }}
            >
              <SortableContext items={keyList} strategy={verticalListSortingStrategy}>
                <Checkbox.Group value={value} onChange={onColumnsCheckChange}>
                  {menu}
                </Checkbox.Group>
                <DragOverlay>
                  {activeId && (
                    <Item
                      {...activeItem}
                      isOverlay
                      isChecked={value.includes(activeId)}
                      columnKey={activeId}
                    />
                  )}
                </DragOverlay>
              </SortableContext>
            </DndContext>
          </div>
        )
      }}
    >
      <Tooltip title={t('column_setting')}>
        <SettingOutlined style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
      </Tooltip>
    </Dropdown>
  );
}

export default ColumnSetting;
