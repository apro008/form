import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const Textinput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  text,
  validText,
  keyboardType,
}) => {
  return (
    <View>
      {text?.length > 0 ? <Text style={styles.text}>{text}</Text> : null}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputStyle]}
        numberOfLines={1}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {validText?.length > 0 ? (
        <Text style={styles.errorMsg}>{validText}</Text>
      ) : null}
    </View>
  );
};

export default Textinput;

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomWidth: 0.5,
    height: height * 0.05,
    width: width * 0.85,
    borderRadius: 5,
    fontSize: 15,
  },
  text: {
    fontSize: 20,
    color: '#1a237e',
    fontWeight: '700',
    marginTop: 10,
  },
  errorMsg: {
    fontSize: 13,
    color: 'red',
  },
});
