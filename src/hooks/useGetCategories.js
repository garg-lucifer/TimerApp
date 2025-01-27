import {useCallback, useState} from 'react';
import {getCategories} from '../storage/timerrepo';
import {useFocusEffect} from '@react-navigation/native';

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCategories = async () => {
        try {
          const categoriesList = await getCategories();
          setCategories(categoriesList);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    }, []),
  );

  return {categories};
};
