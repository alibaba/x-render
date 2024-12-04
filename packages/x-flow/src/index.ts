import XFlow from './XFlow';
import withProvider from './withProvider';

import * as nodes from './nodes';

export type {
default as FR,
} from './types';

export { FlowProvider } from './components/FlowProvider';
export { useFlow } from './hooks/useFlow';
export { useNodes } from './hooks/useNodes';
export { useEdges } from './hooks/useEdges';

export default withProvider(XFlow, nodes);
