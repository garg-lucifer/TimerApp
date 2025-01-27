import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {TitleInput} from '../components/TittleInput';
import {Button} from '../components/Button';
import {useAddTimer} from '../hooks/useAddTimer';

export const AddTimer = () => {
  const {addNewTimer} = useAddTimer();

  const [taskName, setTaskName] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleSave = () => {
    const isNumber = str => !isNaN(str) && str.trim() !== '';
    if (!taskName || duration <= 0 || !category) {
      Alert.alert('Please fill out all fields with valid data.');
      return;
    } else if (isNumber(category)) {
      Alert.alert('Category cannot be a number.');
      return;
    }
    addNewTimer(taskName, duration, category);
    setTaskName('');
    setDuration('');
    setCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Timer</Text>
      <TitleInput
        title="Task Name"
        placeholder="Enter task name"
        value={taskName}
        onChange={setTaskName}
      />
      <TitleInput
        title="Duration (seconds)"
        placeholder="Enter duration"
        value={duration.toString()}
        keyboardType="numeric"
        onChange={val => {
          setDuration(val.replace(/[^0-9]/g, ''));
        }}
      />
      <TitleInput
        title="Category"
        placeholder="Enter category"
        value={category}
        onChange={setCategory}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} isPrimary={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
