import {useState} from 'react';
import {getTimersByCategory} from '../storage/timerrepo';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export const useGetTimersWithCategory = category => {
  const [timersId, setTimersId] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getTimerIds = async () => {
        try {
          const lTimerIds = await getTimersByCategory(category);
          setTimersId(lTimerIds);
        } catch (error) {
          console.error('Error getting timers by category:', error);
        }
      };

      getTimerIds();
    }, [category]),
  );

  return {timersId};
};
