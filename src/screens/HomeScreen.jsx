import {useGetCategories} from '../hooks/useGetCategories';
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Category} from '../components/Category';
import {useUpdateRunningTimers} from '../hooks/useUpdateRunningTimers';
export const HomeScreen = () => {
  const {categories} = useGetCategories();
  useUpdateRunningTimers();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timers Management</Text>
      <FlatList
        data={categories}
        renderItem={({item}) => <Category category={item} />}
        keyExtractor={item => item}
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
