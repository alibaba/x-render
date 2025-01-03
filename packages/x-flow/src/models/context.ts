import { createContext } from 'react';
import { FlowProps } from '../types';
import { FlowStore } from './store';

type Config = FlowProps & Record<string,any>
export const ConfigContext = createContext(null);

const StoreContext = createContext<FlowStore | null>(null);
export const Provider = StoreContext.Provider;
export default StoreContext;
