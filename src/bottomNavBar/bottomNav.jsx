import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '../screens/HomeScreen';
import {AddTimer} from '../screens/AddTimer';
import {History} from '../screens/History';
import {Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

// Local images for icons
const icons = {
  Home: require('../../assets/home.png'),
  'Add Timer': require('../../assets/add.png'),
  History: require('../../assets/history.png'),
};

// Screen options with custom image-based icons
const screenOptions = ({route}) => ({
  tabBarIcon: ({focused}) => {
    const iconSource = icons[route.name];
    return (
      <Image
        source={iconSource}
        style={[styles.icon, {tintColor: focused ? 'black' : 'gray'}]}
      />
    );
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  tabBarShowLabel: false,
});

export const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Add Timer"
          component={AddTimer}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
