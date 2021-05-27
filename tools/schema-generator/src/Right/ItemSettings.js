import React, { useState, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { useStore } from '../hooks';
import IdInput from '../widgets/antd/idInput';
import PercentSlider from '../widgets/antd/percentSlider';
import {
  defaultSettings,
  baseCommonSettings,
  defaultCommonSettings,
  elements,
  advancedElements,
  layouts,
} from '../Settings';
import { getWidgetName } from '../mapping';
import { isObject } from '../utils';

export default function ItemSettings() {
  const form = useForm();
  const {
    selected,
    flatten,
    onItemChange,
    userProps = {},
    widgets: defaultWidgets,
    mapping: defaultMapping,
  } = useStore();

  const { settings, commonSettings, hideId } = userProps;
  const [settingSchema, setSettingSchema] = useState({});
  // 避免切换选中项时 schema 对应出错
  const [ready, setReady] = useState({});

  const widgets = {
    ...defaultWidgets,
    idInput: IdInput,
    percentSlider: PercentSlider,
  };

  const getWidgetList = (settings, commonSettings) => {
    return settings.reduce((widgetList, setting) => {
      if (!Array.isArray(setting.widgets)) return widgetList;
      const basicWidgets = setting.widgets.map(item => {
        const baseItemSettings = {};
        if (item.schema.type === 'array') {
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
            getWidgetName(item.schema, defaultMapping),
          setting: {
            ...baseCommonSettings,
            ...commonSettings,
            ...baseItemSettings,
            ...item.setting,
          },
        };
      });
      return [...widgetList, ...basicWidgets];
    }, []);
  };

  const onDataChange = value => {
    try {
      if (!ready) return;
      const item = flatten[selected];
      if (item && item.schema) {
        onItemChange(selected, {
          ...item,
          schema: value,
        });
      }
    } catch (error) {
      console.log(error, 'catch');
    }
  };

  useEffect(() => {
    // setting 该显示什么的计算，要把选中组件的 schema 和它对应的 widgets 的整体 schema 进行拼接
    try {
      const item = flatten[selected];
      if (!item || selected === '#') return;
      setReady(false);
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
      const widgetName = getWidgetName(item.schema, defaultMapping);
      const element = widgetList.find(e => e.widget === widgetName) || {}; // 有可能会没有找到
      const properties = { ...element.setting };

      if (hideId) delete properties.$id;

      setSettingSchema({
        type: 'object',
        displayType: 'column',
        properties,
      });
      form.setValues(item.schema);
      setTimeout(() => {
        setReady(true);
        onDataChange(form.getValues());
      }, 0);
    } catch (error) {
      console.log(error);
    }
  }, [selected]);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={settingSchema}
        widgets={widgets}
        watch={{
          '#': v => onDataChange(v),
        }}
      />
    </div>
  );
}
