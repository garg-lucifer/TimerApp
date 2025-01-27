import {useState} from 'react';
import {getCompletedTimers} from '../storage/timerrepo';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export const useGetCompletedTimers = () => {
  const [completedTimers, setCompletedTimers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCompletedTimers = async () => {
        const data = await getCompletedTimers();
        setCompletedTimers(data);
      };

      fetchCompletedTimers();
    }, []),
  );

  return {completedTimers};
};
