import React, { useState, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { useStore } from '../hooks';
import IdInput from '../widgets/antd/idInput';
import PercentSlider from '../widgets/antd/percentSlider';
import {
  defaultSettings,
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
    mapping: defaultMapping
  } = useStore();

  const { settings, commonSettings } = userProps;
  const [settingSchema, setSettingSchema] = useState({});
  const widgets = {
    ...defaultWidgets,
    idInput: IdInput,
    percentSlider: PercentSlider,
  };

  const getWidgetList = (settings, commonSettings) => {
    return settings.reduce((widgetList, setting) => {
      if (!Array.isArray(setting.widgets)) return widgetList;
      const basicWidgets = setting.widgets
        .map(item => ({
          ...item,
          widget: item.widget || item.schema.widget || getWidgetName(item.schema, defaultMapping),
          setting: { ...commonSettings, ...item.setting }
        }));
      return [...widgetList, ...basicWidgets];
    }, []);
  };

  const onDataChange = (value, key) => {
    try {
      const isIdChange = key === '$id';
      if (!isIdChange && selected !== value.$id) return;
      const item = flatten[selected];
      if (item && item.schema) {
        const schema = isIdChange
          ? { ...item.schema, $id: value }
          : value;
        onItemChange(selected, { ...item, schema });
      }
    } catch (error) {
      console.log(error, 'catch');
    }
  };

  useEffect(() => {
    // setting 该显示什么的计算，要把选中组件的 schema 和它对应的 widgets 的整体 schema 进行拼接
    try {
      const itemSelected = flatten[selected];
      if (!itemSelected) return;
      // 算 widgetList
      const _settings = Array.isArray(settings)
        ? [...settings, { widgets: [...elements, ...advancedElements, ...layouts] }] // TODO: 不是最优解
        : defaultSettings;
      const _commonSettings = isObject(commonSettings) ? commonSettings : defaultCommonSettings;
      const widgetList = getWidgetList(_settings, _commonSettings);
      const widgetName = getWidgetName(itemSelected.schema, defaultMapping);
      const element = widgetList.find(e => e.widget === widgetName) || {}; // 有可能会没有找到
      const schemaNow = element.setting;
      setSettingSchema({
        type: 'object',
        displayType: 'column',
        showDescIcon: true,
        properties: {
          ...schemaNow,
        },
      });
      setTimeout(() => form.setValues(itemSelected.schema), 0);
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
          '$id': v => onDataChange(v, '$id'),
        }}
      />
    </div>
  );
}
