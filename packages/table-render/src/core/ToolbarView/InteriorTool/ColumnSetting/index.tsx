import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Tooltip, ConfigProvider, Dropdown, Checkbox, Divider, Button } from 'antd';
import { CloseOutlined, SettingOutlined, UndoOutlined } from '@ant-design/icons';
import { translation } from '../../../../utils';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useStore } from '../../../store';
import { ToolbarActionConfig } from '@/types';
import Item from './item';
import omit from 'lodash.omit';
import './index.less';

const prefix = 'tr-toolbar-column-setting';
type Setting = ToolbarActionConfig['columnsSettingValue'];

/**
 * 获取当前项的位置状态
 */
export const getStatus = (setting: Setting, key: string) => {
  const length = setting.length;
  const index = setting.findIndex(i => i.key === key);
  const isFixed = !!setting[index].fixed;
  const isFirstOne = index === 0;
  const isLastOne = index === length - 1;
  const preFixed = !isFirstOne && !!setting[index - 1]?.fixed;
  const nextFixed = !isLastOne && !!setting[index + 1]?.fixed;
  const haveForwardUnFixed = setting.slice(0, index).some(i => !i.fixed);
  const haveBackwardUnFixed = setting.slice(index).some(i => !i.fixed);
  const onFirstPart = index + 1 < (length / 2);

  return {
    index,
    /** 当前项是固定的 */
    isFixed,
    /** 是第一个 */
    isFirstOne,
    /** 是最后一个 */
    isLastOne,
    /** 前一个是固定的 */
    preFixed,
    /** 后一个是固定的 */
    nextFixed,
    /** 前面存在未固定的 */
    haveForwardUnFixed,
    /** 后面存在未固定的 */
    haveBackwardUnFixed,
    /** 在前半部分 */
    onFirstPart,
  }
}

const fixItem: (setting: Setting, fixKey: string) => Setting = (setting, fixKey) => {
  return setting.map(i => {
    if (i.key === fixKey) {
      const { onFirstPart, preFixed, nextFixed, isFirstOne, isLastOne, index } = getStatus(setting, i.key);
      let fixed;

      if (preFixed && !nextFixed && !isLastOne) {
        fixed = setting[index - 1].fixed
      }

      if (!preFixed && nextFixed && !isFirstOne) {
        fixed = setting[index + 1].fixed
      }

      if (onFirstPart) {
        fixed = 'right'
      } else {
        fixed = 'left';
      }

      return {
        ...i,
        fixed,
      }
    }
    return i;
  })
}


/**
 * 取消固定不应该的固定的那些列
 * 
 * @param setting 排序或固定之后的 setting 数组
 * @returns newSetting 新 setting 数组
 */
const cancelFixed: (setting: Setting) => Setting = (setting) => {
  return setting.map((i) => {
    if (i.fixed) {
      const { haveBackwardUnFixed, haveForwardUnFixed, isFirstOne, isLastOne } = getStatus(setting, i.key);

      if (haveForwardUnFixed && haveBackwardUnFixed && !isLastOne && !isFirstOne) {
        return omit(i, 'fixed');
      }
    }
    return i;
  })
}

const ColumnSetting: React.FC<Pick<ToolbarActionConfig, 'columnsSettingValue' | 'onColumnsSettingChange'>> = ({
  columnsSettingValue,
  onColumnsSettingChange
}) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const columns = useStore(store => store.columns);
  const columnsSetting = useStore((store) => store.columnsSetting);
  const setColumnsSetting = useStore(store => store.setColumnsSetting);

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
    const initSetting = columns.map((i) => ({
      key: String(i.key),
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

  const onFixItem = (key: string) => {
    const fixedSetting = fixItem(columnsSetting, key);
    const finalSetting = cancelFixed(fixedSetting);
    setColumnsSetting(finalSetting);
  }

  const onUnfixItem = (key: string) => {
    const canceledSetting = columnsSetting.map(i => ({
      ...i,
      fixed: i.key === key ? undefined : i.fixed,
    }))
    const finalSetting = cancelFixed(canceledSetting);
    setColumnsSetting(finalSetting);
  }


  const getItems = (setting: Setting) => {
    if (!setting) return [];
    return setting
      .map(i => {
        return {
          label: (
            <Item
              {...i}
              onFixItem={onFixItem}
              onUnfixItem={onUnfixItem}
              columnKey={String(i.key)}
            />
          ),
          // must have a key
          key: i.key,
        }
      })
  }

  const onReset = () => {
    init();
  }

  const onColumnsCheckChange = (val: string[]) => {
    const newColumns = columnsSetting.map(i => ({
      ...i,
      hidden: !val.includes(String(i.key))
    }))
    handleChange(newColumns);
  }

  const items = useMemo(() => getItems(columnsSetting), [columnsSetting]);
  const activeItem = useMemo(() => columnsSetting.find(i => i.key === activeId), [columnsSetting, activeId]);
  const keyList = useMemo(() => columnsSetting.map(i => i.key), [columnsSetting]);
  const value = useMemo(() => columnsSetting.filter(i => !i.hidden).map(i => i.key), [columnsSetting]);

  console.log('columnsSetting', columnsSetting);
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
                  const newSetting = arrayMove(columnsSetting, findIndex(active.id), findIndex(over.id));
                  const finalSetting = cancelFixed(newSetting);
                  handleChange(finalSetting);
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
