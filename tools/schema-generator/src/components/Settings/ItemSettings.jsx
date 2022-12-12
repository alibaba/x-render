import FormRender, { useForm } from 'form-render';
import React, { useEffect, useState, useRef } from 'react';
import {
  advancedElements,
  baseCommonSettings,
  defaultCommonSettings,
  defaultSettings,
  elements,
  layouts,
} from '../../settings';
import { isObject, mergeInOrder } from '../../utils';
import { useGlobal, useStore } from '../../utils/hooks';
import { getWidgetName } from '../../utils/mapping';
import * as frgWidgets from '../../widgets';

export default function ItemSettings({ widgets }) {
  const setGlobal = useGlobal();
  const form = useForm();
  const isReady = useRef(false);
  const {
    selected,
    flatten,
    onItemChange,
    onItemErrorChange,
    userProps = {},
    widgets: globalWidgets,
    mapping: globalMapping,
  } = useStore();

  const { settings, commonSettings, hideId, validation, transformer } =
    userProps;
  const [settingSchema, setSettingSchema] = useState({});

  const _widgets = {
    ...globalWidgets,
    ...frgWidgets,
  };

  const getWidgetList = (settings, commonSettings) => {
    return settings.reduce((widgetList, setting) => {
      if (!Array.isArray(setting.widgets)) return widgetList;
      const basicWidgets = setting.widgets.map(item => {
        const baseItemSettings = {};
        if (item.schema.type === 'array' && item.schema.items) {
          baseItemSettings.items = {
            type: 'object',
            hidden: '{{true}}',
          };
        }
        return {
          ...item,
          widget:
            item.widget ||
            item.schema.widget ||
            getWidgetName(item.schema, globalMapping),
          setting: mergeInOrder(
            baseCommonSettings,
            commonSettings,
            baseItemSettings,
            item.setting
          ),
        };
      });
      return [...widgetList, ...basicWidgets];
    }, []);
  };

  const onDataChange = (value = {}) => {
    try {
      if (selected === '#' || !isReady.current || !value.$id) return;
      const item = {
        ...flatten[selected],
        schema: transformer.fromSetting(value),
      };
      onItemChange(selected, item, 'schema');
    } catch (error) {
      console.error(error, 'catch');
    }
  };

  useEffect(() => {
    // setting 该显示什么的计算，要把选中组件的 schema 和它对应的 widgets 的整体 schema 进行拼接
    try {
      isReady.current = false;
      const item = flatten[selected];
      if (!item || selected === '#') return;
      // 算 widgetList
      const _settings = Array.isArray(settings)
        ? [
            ...settings,
            { widgets: [...elements, ...advancedElements, ...layouts] },
          ] // TODO: 不是最优解
        : defaultSettings;
      const _commonSettings = isObject(commonSettings)
        ? commonSettings
        : defaultCommonSettings;
      const widgetList = getWidgetList(_settings, _commonSettings);
      const widgetName = getWidgetName(item.schema, globalMapping);
      const element = widgetList.find(e => e.widget === widgetName) || {}; // 有可能会没有找到
      const properties = { ...element.setting };

      if (hideId) delete properties.$id;

      setTimeout(() => {
        setSettingSchema({
          type: 'object',
          displayType: 'column',
          properties,
        });
        const value = transformer.toSetting(item.schema);
        form.setValues(value);
        onDataChange(form.getValues());
        validation && form.submit();
        isReady.current = true;
      }, 0);
    } catch (error) {
      isReady.current = true;
      console.error(error);
    }
  }, [selected]);

  useEffect(() => {
    validation && onItemErrorChange(form?.errorFields);
  }, [validation, form?.errorFields]);

  useEffect(() => {
    setGlobal({ settingsForm: form });
  }, []);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={settingSchema}
        widgets={{ ..._widgets, ...widgets }}
        mapping={globalMapping}
        watch={{
          '#': v => setTimeout(() => onDataChange(v), 0),
        }}
      />
    </div>
  );
}
