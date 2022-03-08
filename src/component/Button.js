import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const Button = ({onPress, propStyle, name}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, {...propStyle}]}>
      <Text style={styles.textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    height: height / 16,
    width: width * 0.85,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginLeft: 20,
  },
  textStyle: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
