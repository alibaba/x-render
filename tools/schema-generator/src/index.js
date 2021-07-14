import React, { forwardRef } from 'react';
import Provider from './Provider';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Settings from './components/Settings';
import './styles/index.less';

const Generator = forwardRef(({
  fixedName,
  settingsWidgets,
  onCanvasSelect,
  ...props
}, ref) => {
  return (
    <Provider ref={ref} {...props}>
      <div className="fr-generator-container">
        <Sidebar fixedName={fixedName} />
        <Canvas onSelect={onCanvasSelect} />
        <Settings widgets={settingsWidgets} />
      </div>
    </Provider>
  );
});

Generator.Provider = Provider;
Generator.Sidebar = Sidebar;
Generator.Canvas = Canvas;
Generator.Settings = Settings;

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './settings';
export {
  fromSetting,
  toSetting,
} from './transformer/form-render';
export default Generator;
