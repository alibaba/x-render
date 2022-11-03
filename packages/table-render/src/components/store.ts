import { TableContext } from '@/types';
import { createContext } from 'react';

export const Ctx = createContext<TableContext<any>>({});
export const StoreCtx = createContext({});
