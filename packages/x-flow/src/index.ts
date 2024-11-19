import Main from './main';
import withProvider from './withProvider';
import * as nodes from './nodes';

export type {
default as FR,
} from './types';

export default withProvider(Main, nodes);
