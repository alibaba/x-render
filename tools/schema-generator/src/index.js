import React, { useEffect, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import Canvas from './components/Canvas';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Provider from './Provider';
import './i18next';
import './styles/index.less';

const Generator = forwardRef(
  (
    { fixedName, settingsWidgets, onCanvasSelect, locale = 'cn', ...props },
    ref
  ) => {
    const { i18n } = useTranslation();
    useEffect(() => {
      i18n.changeLanguage(locale);
    }, [locale]);

    return (
      <Provider ref={ref} {...props}>
        <div className="fr-generator-container">
          <Sidebar fixedName={fixedName} />
          <Canvas onSelect={onCanvasSelect} />
          <Settings widgets={settingsWidgets} />
        </div>
      </Provider>
    );
  }
);

Generator.Provider = Provider;
Generator.Sidebar = Sidebar;
Generator.Canvas = Canvas;
Generator.Settings = Settings;

export {
  defaultCommonSettings,
  defaultGlobalSettings,
  defaultSettings,
} from './settings';
export { fromSetting, toSetting } from './transformer/form-render';
export default Generator;

export * from "./utils/serialize"
