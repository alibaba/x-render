import { init, plugins } from '@alilc/lowcode-engine';
import EditorInitPlugin from './plugins/plugin-editor-init';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import InjectPlugin from '@alilc/lowcode-plugin-inject';
import ComponentPanelPlugin from './plugins/plugin-component-panel';
import TransformSchemaSPlugin from './plugins/plugin-transform-schema';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewPlugin from './plugins/plugin-preview';
import CustomSetterSamplePlugin from './plugins/plugin-custom-setter-sample';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
import FrSchema from './plugins/plugin-fr-schema';
import CaseStore from './plugins/plugin-case-store'
import SaveCasePlugin from './plugins/plugin-save-case';
import EditorSchema from './plugins/plugin-editor-schema'

import './global.scss';

async function registerPlugins() {
  await plugins.register(InjectPlugin);

  await plugins.register(EditorInitPlugin, {
    scenarioName: 'basic-antd',
    displayName: 'XRender',
    info: {
      urls: [
        {
          key: '设计器',
          value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-basic-antd',
        },
        {
          "key": "antd 物料",
          "value": "https://github.com/alibaba/lowcode-materials/tree/main/packages/antd-lowcode-materials"
        }
      ],
    },
  });

  // 设置内置 setter 和事件绑定、插件绑定面板
  // await plugins.register(DefaultSettersRegistryPlugin);

 //await plugins.register(OutlinePlugin);

  await plugins.register(LogoSamplePlugin);

  await plugins.register(ComponentPanelPlugin);

  // await plugins.register(JsonSchema);
  await plugins.register(FrSchema);
  
 
  await plugins.register(CaseStore);

  await plugins.register(EditorSchema);


  // await plugins.register(SchemaPlugin);


  // 注册回退/前进
  // await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  await plugins.register(ZhEnPlugin);

  // // await plugins.register(CodeEditorPlugin);

  // 注册导入导出功能
  await plugins.register(TransformSchemaSPlugin);

  await plugins.register(SaveSamplePlugin);

  await plugins.register(SaveCasePlugin);

  await plugins.register(PreviewPlugin);

  await plugins.register(CustomSetterSamplePlugin);

};

(async function main() {
  await registerPlugins();

  init(document.getElementById('lce-container')!, {
    locale: 'zh-CN',
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: false,
    // simulatorUrl 在当 engine-core.js 同一个父路径下时是不需要配置的！！！
    // 这里因为用的是 alifd cdn，在不同 npm 包，engine-core.js 和 react-simulator-renderer.js 是不同路径
    simulatorUrl: [
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js'
    ]
  });
})();
