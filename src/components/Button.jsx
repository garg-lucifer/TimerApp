import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export const Button = ({title, onPress, isPrimary}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
      ]}>
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: 'black',
  },
  secondaryButton: {
    backgroundColor: '#dcdcdc',
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'black',
  },
});
