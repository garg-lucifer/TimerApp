import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const CompletedTimer = ({timer}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {timer.name}</Text>
      <Text style={styles.title}>
        Category: {timer.category[0].toUpperCase() + timer.category.slice(1)}
      </Text>
      <Text style={styles.time}>
        Original Duration: {timer.originalDuration} seconds
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: '400',
  },
});
