import {useEffect, useRef, useState} from 'react';
import {getTimer} from '../storage/timerrepo';

export const useGetTimer = timerTaskId => {
  const [timerTask, setTimerTask] = useState({});
  const [isJustCompleted, setIsJustCompleted] = useState(false);
  const prevState = useRef();

  useEffect(() => {
    const getData = async () => {
      const data = await getTimer(timerTaskId);
      setTimerTask(data);
      if (
        !!prevState.current &&
        prevState.current?.currentDuration !== 0 &&
        data.currentDuration === 0
      ) {
        setIsJustCompleted(true);
      } else {
        setIsJustCompleted(false);
      }
      prevState.current = data;
    };

    const intervalId = setInterval(() => {
      getData();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timerTaskId]);

  return {timerTask, isJustCompleted};
};
