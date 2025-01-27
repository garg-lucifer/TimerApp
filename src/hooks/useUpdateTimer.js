import {useCallback} from 'react';
import {updateTimerStatus} from '../storage/timerrepo';

export const useUpdateTimer = () => {
  const updateTimer = useCallback((timerId, status) => {
    updateTimerStatus(timerId, status);
  }, []);
  return {updateTimer};
};
