import DRender from './core';
import withProvider from './withProvider';
import * as defaultWidgets from './widgets';

export { default as FRender } from './core/renderer';

export const DataSlimRender = withProvider(DRender);
export default withProvider(DRender, defaultWidgets);
