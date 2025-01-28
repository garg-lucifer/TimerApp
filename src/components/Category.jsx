import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Button} from './Button';
import {useGetTimersWithCategory} from '../hooks/useGetTimersWithCategory';
import {useUpdateTimer} from '../hooks/useUpdateTimer';
import {TimerStatus} from '../storage/utils';
import {TimerTask} from './TimerTask';

export const Category = ({category}) => {
  const {timersId} = useGetTimersWithCategory(category);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const {updateTimer} = useUpdateTimer();

  // Create an array of states for each timer
  const [timerStatuses, setTimerStatuses] = React.useState(
    timersId.map(() => TimerStatus.RUNNING),
  );

  const toggleExpansion = () => {
    setIsExpanded(prevState => !prevState); // Toggle the expanded/collapsed state
  };

  const changeGroupTimerStatus = status => {
    timersId.forEach((timer, index) => {
      updateTimer(timer, status);
      setTimerStatuses(prevStatuses => {
        const updatedStatuses = [...prevStatuses];
        updatedStatuses[index] = status;
        return updatedStatuses;
      });
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpansion} style={styles.iconContainer}>
        <Text style={styles.title}>{category.toUpperCase()}</Text>
        <Image
          source={require('../../assets/down-arrow.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <Button
              title="Start All"
              onPress={() => changeGroupTimerStatus(TimerStatus.RUNNING)}
              isPrimary={true}
            />
            <Button
              title="Pause All"
              onPress={() => changeGroupTimerStatus(TimerStatus.PAUSED)}
              isPrimary={false}
            />
            <Button
              title="Reset All"
              onPress={() => changeGroupTimerStatus(TimerStatus.RESET)}
              isPrimary={true}
            />
          </View>

          <FlatList
            data={timersId}
            renderItem={({item, index}) => (
              <TimerTask
                timerTaskId={item}
                timerStatus={timerStatuses[index]}
                setTimerStatus={newStatus => {
                  setTimerStatuses(prevStatuses => {
                    const updatedStatuses = [...prevStatuses];
                    updatedStatuses[index] = newStatus;
                    return updatedStatuses;
                  });
                }}
              />
            )}
            keyExtractor={item => item}
            style={styles.listStyle}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  listStyle: {
    width: '80%',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
