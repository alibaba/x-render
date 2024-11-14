import { createContext, useRef, useContext } from 'react';
import { createStore } from 'zustand/vanilla';

type Shape = {
  appId: string
}

export const createWorkflowStore = () => {
  return createStore<Shape>(set => ({
    appId: '',
    candidateNode: {}
  }))
}



type WorkflowStore = ReturnType<typeof createWorkflowStore>
export const WorkflowContext = createContext<WorkflowStore | null>(null)

type WorkflowProviderProps = {
  children: React.ReactNode
}


export const WorkflowContextProvider = ({ children }: WorkflowProviderProps) => {
  const storeRef = useRef<WorkflowStore>();

  if (!storeRef.current) {
    storeRef.current = createWorkflowStore();
  }
   
  return (
    <WorkflowContext.Provider value={storeRef.current}>
      {children}
    </WorkflowContext.Provider>
  );
}

export const useWorkflowStore = () => {
  return useContext(WorkflowContext)!
}
