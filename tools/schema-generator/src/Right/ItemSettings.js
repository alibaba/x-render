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
    let widgetList = [];
    settings.forEach(setting => {
      // TODO: 这里要判断一下否则会crash
      const _widgets = setting.widgets;
      const basicWidgets = _widgets
        .map(item => ({
          ...item,
          widget: item.widget || item.schema.widget || getWidgetName(item.schema, defaultMapping),
          setting: { ...commonSettings, ...item.setting }
        }));
      widgetList = [...widgetList, ...basicWidgets];
    });
    return widgetList;
  };

  const onDataChange = (value) => {
    if (selected === value.$id) {
      try {
        const item = flatten[selected];
        if (item && item.schema) {
          onItemChange(selected, { ...item, schema: value });
        }
      } catch (error) {
        console.log(error, 'catch');
      }
    }
  };

  useEffect(() => {
    // 算 widgetList
    const _settings = Array.isArray(settings)
      ? [...settings, { widgets: [...elements, ...advancedElements, ...layouts] }] // TODO: 不是最优解
      : defaultSettings;
    const _commonSettings = isObject(commonSettings)
      ? commonSettings
      : defaultCommonSettings;
    const widgetList = getWidgetList(_settings, _commonSettings);

    // setting 该显示什么的计算，要把选中组件的 schema 和它对应的 widgets 的整体 schema 进行拼接
    let itemSelected;
    let widgetName;
    try {
      itemSelected = flatten[selected];
      if (itemSelected) {
        widgetName = getWidgetName(itemSelected.schema, defaultMapping);
      }
      if (widgetName) {
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
        setTimeout(() => {
          form.setValues(itemSelected.schema);
        }, 0);
      }
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
          '#': v => onDataChange(v)
        }}
      />
    </div>
  );
}
