import { createContext } from 'react';
import { FlowStore } from './store';

export const ConfigContext = createContext(null);

const StoreContext = createContext<FlowStore | null>(null);
export const Provider = StoreContext.Provider;
export default StoreContext;
