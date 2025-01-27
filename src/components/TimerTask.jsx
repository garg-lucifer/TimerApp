import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TimerStatus} from '../storage/utils';
import {Button} from './Button';
import {useUpdateTimer} from '../hooks/useUpdateTimer';
import {useGetTimer} from '../hooks/useGetTimer';
import {CongratulationModal} from './CongratulationModal';

export const TimerTask = ({timerTaskId}) => {
  const {timerTask, isJustCompleted} = useGetTimer(timerTaskId);
  const isCompleted = timerTask.currentDuration === 0;
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  useEffect(() => {
    if (isJustCompleted) {
      setIsModalVisible(true);
    }
  }, [isJustCompleted]);

  const {updateTimer} = useUpdateTimer();

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsLeft
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{timerTask.name}</Text>
      <Text style={styles.time}>
        {isCompleted
          ? 'Completed'
          : `Remaining time: ${formatTime(timerTask.currentDuration)}`}
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${
                ((timerTask.originalDuration - timerTask.currentDuration) /
                  timerTask.originalDuration) *
                100
              }%`,
            },
          ]}
        />
      </View>
      {!isCompleted && (
        <View style={styles.buttonContainer}>
          <Button
            title={timerTask.status === TimerStatus.PAUSED ? 'Start' : 'Pause'}
            onPress={() => {
              updateTimer(
                timerTask.id,
                timerTask.status === TimerStatus.PAUSED
                  ? TimerStatus.RUNNING
                  : TimerStatus.PAUSED,
              );
            }}
            isPrimary={true}
          />
          <Button
            title={'Reset'}
            onPress={() => {
              updateTimer(timerTask.id, TimerStatus.RESET);
            }}
            isPrimary={false}
          />
        </View>
      )}
      <CongratulationModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        timerName={timerTask.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    marginBottom: 10,
    color: '#A09CAB',
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
