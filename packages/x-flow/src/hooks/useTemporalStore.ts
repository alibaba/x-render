import StoreContext from '../models/context';
import { useContext } from 'react';

export const useTemporalStore = () => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(
      '[XFlow]: Seems like you have not used zustand provider as an ancestor.'
    );
  }

  return {
    ...store.temporal.getState(),
    record: (callback: () => void) => {
      const temporalStore = store.temporal.getState();
      temporalStore.resume();
      callback();
      temporalStore.pause();
    },
  };
};
