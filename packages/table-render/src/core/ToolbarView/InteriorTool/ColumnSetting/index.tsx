import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Tooltip, ConfigProvider, Dropdown, Checkbox, Divider, Button } from 'antd';
import { CloseOutlined, SettingOutlined, UndoOutlined } from '@ant-design/icons';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useTableStore } from '../../../store';
import { getColumnKey, translation } from '../../../../utils';
import { ToolbarActionConfig } from '@/types';
import Item from './item';
import { cancelFixed, fixItem, Setting } from './utils';
import clx from 'classnames'
import './index.less';

const prefix = 'tr-toolbar-column-setting';

const ColumnSetting: React.FC<Pick<ToolbarActionConfig, 'columnsSettingValue' | 'onColumnsSettingChange'>> = ({
  columnsSettingValue,
  onColumnsSettingChange
}) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const columns = useTableStore(store => store.columns);
  const columnsSetting = useTableStore((store) => store.columnsSetting);
  const setColumnsSetting = useTableStore(store => store.setColumnsSetting);

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const inited = useRef(false);

  useEffect(() => {
    if (columnsSettingValue) {
      setColumnsSetting(columnsSettingValue);
    }
  }, [columnsSettingValue]);

  useEffect(() => {
    if (open && columns.length > 0 && !inited.current) {
      init();
      inited.current = true;
      return;
    }

    if (!open) {
      inited.current = false;
      return;
    }
  }, [open, columns])

  const init = () => {
    const initSetting = columns.map((i, index) => ({
      key: getColumnKey(i, index),
      hidden: false,
    }))
    handleChange(initSetting);
  }

  const findIndex = (key: any) => {
    return columnsSetting.findIndex(i => i.key === key)
  }

  const handleChange = (setting: Setting) => {
    setColumnsSetting(setting);
    onColumnsSettingChange?.(setting);
  }

  const getItems = (setting: Setting) => {
    if (!setting) return [];
    return setting.map(i => ({
      className: clx(`${prefix}-item`, {
        [`${prefix}-item-fixed`]: i.fixed,
      }),
      key: i.key,
      label: (
        <Item
          {...i}
          onFixItem={onFixItem}
          onUnfixItem={onUnfixItem}
          columnKey={String(i.key)}
        />
      ),
    }))
  }

  const onReset = () => {
    init();
  }

  /** 固定某一列 */
  const onFixItem = (key: string) => {
    const fixedSetting = fixItem(columnsSetting, key);
    const finalSetting = cancelFixed(fixedSetting);
    setColumnsSetting(finalSetting);
  }

  /** 取消固定某一列 */
  const onUnfixItem = (key: string) => {
    const canceledSetting = columnsSetting.map(i => ({
      ...i,
      fixed: i.key === key ? undefined : i.fixed,
    }))
    const finalSetting = cancelFixed(canceledSetting);
    setColumnsSetting(finalSetting);
  }

  /** 列的显示和隐藏 */
  const onColumnsCheckChange = (val: string[]) => {
    const newColumns = columnsSetting.map(i => ({
      ...i,
      hidden: !val.includes(String(i.key))
    }))
    handleChange(newColumns);
  }

  /** 移动某一列 */
  const onDragEnd = (activeId: any, overId: any) => {
    const newSetting = arrayMove(columnsSetting, findIndex(activeId), findIndex(overId));
    const activeItem = newSetting.find(i => i.key === activeId);

    if (activeItem.fixed) {
      const fixedSetting = fixItem(newSetting, activeId);
      const finalSetting = cancelFixed(fixedSetting);
      handleChange(finalSetting);
    } else {
      const finalSetting = cancelFixed(newSetting);
      handleChange(finalSetting);
    }
  }

  const items = useMemo(() => getItems(columnsSetting), [columnsSetting]);
  const activeItem = useMemo(() => columnsSetting.find(i => i.key === activeId), [columnsSetting, activeId]);
  const keyList = useMemo(() => columnsSetting.map(i => i.key), [columnsSetting]);
  const value = useMemo(() => columnsSetting.filter(i => !i.hidden).map(i => i.key), [columnsSetting]);

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
                {t('reset')}
              </Button>
            </div>
            <Divider style={{ margin: 0 }} />
            <DndContext
              onDragEnd={({ over, active }) => {
                if (over) {
                  onDragEnd(active.id, over.id)
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
