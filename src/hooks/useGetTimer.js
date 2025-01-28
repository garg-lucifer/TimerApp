import {useEffect, useRef, useState} from 'react';
import {getTimer} from '../storage/timerrepo';
import {TimerStatus} from '../storage/utils';

export const useGetTimer = (timerTaskId, status) => {
  const [timerTask, setTimerTask] = useState({});
  const [isJustCompleted, setIsJustCompleted] = useState(false);
  const prevState = useRef();

  useEffect(() => {
    let intervalId;

    const getData = async () => {
      const data = await getTimer(timerTaskId);
      console.log(data);
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

    if (status === TimerStatus.RUNNING) {
      if (isJustCompleted) {
        clearInterval(intervalId);
        return;
      }
      intervalId = setInterval(() => {
        getData();
      }, 1000);
    } else {
      setTimeout(getData, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerTaskId, status, isJustCompleted]);

  return {timerTask, isJustCompleted};
};
