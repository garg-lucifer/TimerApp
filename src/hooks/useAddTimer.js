import {useCallback} from 'react';
import {addTimer} from '../storage/timerrepo';

export const useAddTimer = () => {
  const addNewTimer = useCallback(async (taskName, duration, category) => {
    try {
      addTimer(category.toLowerCase().trim(), taskName, duration);
    } catch (error) {
      console.error('Error adding new timer:', error);
    }
  }, []);
  return {addNewTimer};
};
