import React, { forwardRef } from 'react';
import Canvas from './components/Canvas';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Provider from './Provider';
import './styles/index.less';

const Generator = forwardRef(
  ({ fixedName, settingsWidgets, onCanvasSelect, ...props }, ref) => {
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
