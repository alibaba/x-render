import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Tooltip, ConfigProvider, Dropdown, Checkbox, Divider, Button } from 'antd';
import { HolderOutlined, SettingOutlined } from '@ant-design/icons';
import { translation } from '../../../utils';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../../store';
import './../index.less';
import { ProColumnsType } from '@/types';

const Item: FC<ProColumnsType<any>[number] & {
  columnKey: string,
  isOverlay?: boolean,
  isChecked?: boolean,
}> = ({ title, columnKey, isOverlay = false, isChecked }) => {
  const { setNodeRef, attributes, listeners, transition, transform, isDragging, setActivatorNodeRef } = useSortable({
    id: columnKey,
  });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? '0.6' : 'unset',
  };

  const label = useMemo(() => typeof title === 'function' ? title({}) : title, [title]);

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <HolderOutlined
        {...listeners}
        ref={setActivatorNodeRef}
        style={{ marginRight: 8, color: '#666', cursor: 'move' }}
      />
      {isOverlay ? (
        <Checkbox checked={isChecked}>{label}</Checkbox>
      ) : (
        <Checkbox value={columnKey}>{label}</Checkbox>
      )}
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
    const newColumns = columns.map(i => {
      if (i.key === key) {
        return {
          ...i,
          order: newOrder,
        }
      } else {
        if (newOrder < oldOrder && i.order <= oldOrder && i.order >= newOrder) {
          return {
            ...i,
            order: i.order + 1,
          }
        }

        if (newOrder > oldOrder && i.order <= newOrder && i.order > oldOrder) {
          return {
            ...i,
            order: i.order - 1,
          }
        }

        return i;
      }
    })
    setColumns(newColumns);
  }

  const items = useMemo(() => getItems(columns), [columns]);
  // const indeterminate = useMemo(() => value.length > 0 ? items.length > value.length : false, [value, items]);
  // const checkAll = useMemo(() => items.length === value.length, [value, items]);
  const activeItem = useMemo(() => columns.find(i => i.key === activeId), [columns, activeId]);
  const keyList = useMemo(() => [...columns].sort((a, b) => a.order - b.order).map(i => i.key), [columns]);

  return (
    <Dropdown
      menu={{ items }}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      dropdownRender={(menu) => {
        return (
          <div className='tr-toolbar-columns-setting'>
            <div className='tr-toolbar-columns-setting-header'>
              <Button type="link" size="small" onClick={onReset}>重置</Button>
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
