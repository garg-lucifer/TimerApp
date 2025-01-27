import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerStatus} from './utils';

/** It can be improved by using transaction such that either both gets set in db or none, would require more time to do. Will do if time allows */
export const addTimer = async (category, name, originalDuration) => {
  try {
    // Generate a unique ID for the new timer (simple timestamp-based unique ID)
    const id = String(new Date().getTime());

    // Create the timer object
    const newTimer = {
      id,
      name,
      category,
      status: TimerStatus.PAUSED,
      originalDuration,
      currentDuration: originalDuration,
    };

    // Update the Timer Store (unique id as key)
    await AsyncStorage.setItem(id, JSON.stringify(newTimer));

    // Update the Category Store (category as key, add the new timer id to the array)
    const existingCategoryData = await AsyncStorage.getItem(category);
    const updatedCategoryData = existingCategoryData
      ? [...JSON.parse(existingCategoryData), id]
      : [id]; // If no existing category, create a new array with the ID

    await AsyncStorage.setItem(category, JSON.stringify(updatedCategoryData));
  } catch (error) {
    throw error;
  }
};

export const getTimersByCategory = async category => {
  try {
    // Get the list of timer IDs associated with the category
    const categoryData = await AsyncStorage.getItem(category);
    // If no timers exist for the category, return an empty array
    if (!categoryData) {
      return [];
    }

    // Parse the category data and return the list of timer IDs
    return JSON.parse(categoryData);
  } catch (error) {
    throw error;
  }
};

export const getTimer = async taskId => {
  try {
    // Get the list of timer IDs associated with the category
    const timerData = await AsyncStorage.getItem(taskId);

    // If no timers exist for the category, return an empty array
    if (!timerData) {
      return {};
    }

    // Parse the category data and return the list of timer IDs
    return JSON.parse(timerData);
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    // Filter out the keys that are categories
    const categories = keys.filter(key => isNaN(key));

    return categories;
  } catch (error) {
    throw error;
  }
};

export const updateTimerStatus = async (id, newStatus) => {
  try {
    // Retrieve the timer data by ID
    const timerData = await AsyncStorage.getItem(id);

    // If no timer exists with that ID, throw an error
    if (!timerData) {
      throw new Error('Timer not found');
    }

    // Parse the timer data and update its status
    const updatedTimer = JSON.parse(timerData);

    updatedTimer.status = newStatus;

    if (newStatus === TimerStatus.RESET) {
      updatedTimer.currentDuration = updatedTimer.originalDuration;
      updatedTimer.status = TimerStatus.PAUSED;
    }

    // Save the updated timer back to AsyncStorage
    await AsyncStorage.setItem(id, JSON.stringify(updatedTimer));
  } catch (error) {
    throw error;
  }
};

export const updateTimerDuration = async (id, newDuration) => {
  try {
    // Retrieve the timer data by ID
    const timerData = await AsyncStorage.getItem(id);

    // If no timer exists with that ID, throw an error
    if (!timerData) {
      throw new Error('Timer not found');
    }

    // Parse the timer data and update its current duration
    const updatedTimer = JSON.parse(timerData);
    updatedTimer.currentDuration = newDuration;

    // Save the updated timer back to AsyncStorage
    await AsyncStorage.setItem(id, JSON.stringify(updatedTimer));
  } catch (error) {
    throw error;
  }
};

export const getRunningTimers = async () => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Filter out the keys that are timers (not categories)
    const timerKeys = keys.filter(key => !isNaN(key));

    // Retrieve all timers and filter by RUNNING status
    const runningTimers = [];

    for (const key of timerKeys) {
      const timerData = await AsyncStorage.getItem(key);
      if (timerData) {
        const timer = JSON.parse(timerData);
        if (timer.status === TimerStatus.RUNNING) {
          runningTimers.push(timer);
        }
      }
    }

    return runningTimers;
  } catch (error) {
    throw error;
  }
};

export const getCompletedTimers = async () => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Filter out the keys that are timers (not categories)
    const timerKeys = keys.filter(key => !isNaN(key));

    // Retrieve all timers and filter by COMPLETED status
    const completedTimers = [];

    for (const key of timerKeys) {
      const timerData = await AsyncStorage.getItem(key);
      if (timerData) {
        const timer = JSON.parse(timerData);
        if (timer.currentDuration <= 0) {
          completedTimers.push(timer);
        }
      }
    }

    return completedTimers;
  } catch (error) {
    throw error;
  }
};
