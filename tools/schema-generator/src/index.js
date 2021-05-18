import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Main from './Main';
import './index.less';

const Root = (props, ref) => {
  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <ConfigProvider locale={zhCN}>
        <Main ref={ref} {...props} />
      </ConfigProvider>
    </DndProvider>
  );
};

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './Settings';
export { fromFormily, toFormily } from './transformer/formily';
export { fromFormRender, toFormRender } from './transformer/form-render';
export default forwardRef(Root);
