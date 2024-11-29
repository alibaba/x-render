import { createContext } from 'react';
import { XFlowStore } from './store';

// TODO: 合并到 StoreContext
export const ConfigContext = createContext(null);

const StoreContext = createContext<XFlowStore | null>(null);
export const Provider = StoreContext.Provider;
export default StoreContext;
