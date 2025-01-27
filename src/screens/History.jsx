import {useGetCompletedTimers} from '../hooks/useGetCompletedTimers';
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {CompletedTimer} from '../components/CompletedTimer';

export const History = () => {
  const {completedTimers} = useGetCompletedTimers();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      <FlatList
        data={completedTimers}
        renderItem={({item}) => <CompletedTimer timer={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 40,
  },
});
