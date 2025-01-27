import {useEffect} from 'react';
import {
  getRunningTimers,
  updateTimerDuration,
  updateTimerStatus,
} from '../storage/timerrepo';
import {TimerStatus} from '../storage/utils';

export const useUpdateRunningTimers = () => {
  useEffect(() => {
    const updateRunningTimers = async () => {
      const runningTimers = await getRunningTimers();
      runningTimers.forEach(timer => {
        updateTimerDuration(timer.id, timer.currentDuration - 1);
        if (timer.currentDuration <= 0) {
          updateTimerStatus(timer.id, TimerStatus.PAUSED);
        }
      });
    };

    const interval = setInterval(updateRunningTimers, 1000);

    return () => clearInterval(interval);
  }, []);
};
