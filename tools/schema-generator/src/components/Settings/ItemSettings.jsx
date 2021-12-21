import React, { useState, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import IdInput from '../../widgets/idInput';
import HtmlInput from '../../widgets/htmlInput';
import PercentSlider from '../../widgets/percentSlider';
import {
  defaultSettings,
  baseCommonSettings,
  defaultCommonSettings,
  elements,
  advancedElements,
  layouts,
} from '../../settings';
import { isObject, mergeInOrder } from '../../utils';
import { getWidgetName } from '../../utils/mapping';
import { useStore } from '../../utils/hooks';

export default function ItemSettings({ widgets }) {
  const form = useForm();
  const {
    selected,
    flatten,
    onItemChange,
    onItemErrorChange,
    userProps = {},
    widgets: globalWidgets,
    mapping: globalMapping,
  } = useStore();

  const { settings, commonSettings, hideId, transformer } = userProps;
  const [settingSchema, setSettingSchema] = useState({});

  const _widgets = {
    ...globalWidgets,
    idInput: IdInput,
    htmlInput: HtmlInput,
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

  const onDataChange = value => {
    try {
      const item = flatten[selected];
      if (!item || selected === '#') return;
      if (item && item.schema) {
        onItemChange(
          selected,
          {
            ...item,
            schema: transformer.fromSetting(value),
          },
          'schema'
        );
      }
    } catch (error) {
      console.error(error, 'catch');
    }
  };

  useEffect(() => {
    // setting 该显示什么的计算，要把选中组件的 schema 和它对应的 widgets 的整体 schema 进行拼接
    try {
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
        form.submit();
      }, 0);
    } catch (error) {
      console.error(error);
    }
  }, [selected]);

  useEffect(() => {
    onItemErrorChange(form?.errorFields);
  }, [form?.errorFields]);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={settingSchema}
        widgets={{ ..._widgets, ...widgets }}
        watch={{
          '#': v => setTimeout(() => onDataChange(v), 0),
        }}
      />
    </div>
  );
}
