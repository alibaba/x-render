import React, { forwardRef } from 'react';
import Provider from './Provider';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Settings from './components/Settings';
import './styles/index.less';

const Generator = forwardRef((props, ref) => {
  return (
    <Provider ref={ref} {...props}>
      <div className="fr-generator-container">
        <Sidebar />
        <Canvas />
        <Settings />
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
export { fromFormily, toFormily } from './transformer/formily';
export { fromFormRender, toFormRender } from './transformer/form-render';
export default Generator;
