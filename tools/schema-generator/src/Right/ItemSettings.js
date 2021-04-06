import React from 'react';
import FRWrapper from '../FRWrapper';
import { useStore } from '../hooks';
import { widgets } from '../widgets/antd';
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
  const { selected, flatten, onItemChange, userProps = {} } = useStore();
  const { settings, commonSettings } = userProps;
  let settingSchema = {};
  let settingData = {};

  const getWidgetList = (settings, commonSettings) => {
    let widgetList = [];
    settings.forEach(setting => {
      // TODO: 这里要判断一下否则会crash
      const _widgets = setting.widgets;
      const basicWidgets = _widgets
        .filter(item => item.widget)
        .map(b => ({ ...b, setting: { ...commonSettings, ...b.setting } }));
      widgetList = [...widgetList, ...basicWidgets];
    });
    return widgetList;
  };

  const onDataChange = newSchema => {
    if (selected) {
      try {
        const item = flatten[selected];
        if (item && item.schema) {
          onItemChange(selected, { ...item, schema: newSchema });
        }
      } catch (error) {
        console.log(error, 'catch');
      }
    }
  };

  // 算widgetList
  const _settings = Array.isArray(settings)
    ? [...settings, { widgets: [...elements, ...advancedElements, ...layouts] }] // TODO: 不是最优解
    : defaultSettings;
  const _commonSettings = isObject(commonSettings)
    ? commonSettings
    : defaultCommonSettings;
  const widgetList = getWidgetList(_settings, _commonSettings);

  // setting该显示什么的计算，要把选中组件的schema和它对应的widgets的整体schema进行拼接
  let itemSelected;
  let widgetName;
  try {
    itemSelected = flatten[selected];
    if (itemSelected) {
      widgetName = getWidgetName(itemSelected.schema);
    }
    if (widgetName) {
      // const name = getKeyFromUniqueId(selected);
      const element = widgetList.find(e => e.widget === widgetName) || {}; // 有可能会没有找到
      const schemaNow = element.setting;
      settingSchema = {
        schema: {
          type: 'object',
          properties: {
            ...schemaNow,
          },
        },
      };
      settingData = itemSelected.schema;
    }
  } catch (error) {
    console.log(error);
  }

  const _widgets = {
    ...widgets,
    idInput: IdInput,
    percentSlider: PercentSlider,
  };

  // TODO2: 这边开放

  return (
    <div style={{ paddingRight: 24 }}>
      <FRWrapper
        schema={settingSchema}
        formData={settingData}
        onChange={onDataChange}
        widgets={_widgets}
        preview={true}
        frProps={{ displayType: 'column', showDescIcon: false }}
      />
    </div>
  );
}
