import { createContext } from 'react';
import { TableContext} from './interface';

export const Ctx = createContext<TableContext<any>>({});
export const StoreCtx = createContext({});
