import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Textinput from '../component/Textinput.js';
import Button from '../component/Button.js';

import {useSelector, useDispatch} from 'react-redux';
import {emailReducer, PasswordReducer} from '../redux/stateSlice';

const Screen1 = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [validPassword, setValidPassword] = React.useState('');

  const handleValidCheck = (val, whatToCheck) => {
    let Emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let Passwordreg =
      /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/;

    if (whatToCheck === 'checkEmail') {
      if (val.length === 0) {
        setValidEmail('email address must be enter');
      } else if (Emailreg.test(val) === false) {
        setValidEmail('enter valid email address');
        dispatch(emailReducer(''));
      } else if (Emailreg.test(val) === true) {
        setValidEmail('');
        dispatch(emailReducer(val));
      }
    }

    if (whatToCheck === 'checkPassword') {
      if (val.length === 0) {
        setValidPassword('Password required');
      } else if (Passwordreg.test(val) === false) {
        setValidPassword(
          'minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
        );
        dispatch(PasswordReducer(''));
      } else if (Passwordreg.test(val) === true) {
        setValidPassword('');
        dispatch(PasswordReducer(val));
      }
    }
  };

  const dispatch = useDispatch();

  const {emailData, passwordData} = useSelector(state => state.stateData);

  //console.log(`passwordData`, passwordData);

  const handleSaveNext = () => {
    if (emailData.length > 4 && passwordData.length >= 6) {
      navigation.navigate('Screen2');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContainer}>
          <Textinput
            value={email}
            onChangeText={value => {
              setEmail(value);
              handleValidCheck(value, 'checkEmail');
            }}
            placeholder="Email..."
            text="Enter your Email id"
            validText={validEmail}
          />
          <Textinput
            value={password}
            onChangeText={value => {
              setPassword(value);
              handleValidCheck(value, 'checkPassword');
            }}
            placeholder="Password..."
            text="Enter your Password"
            validText={validPassword}
            secureTextEntry={true}
          />
        </View>
        <Button
          name="Save and next"
          propStyle={{justifyContent: 'center', marginVertical: 10}}
          onPress={handleSaveNext}
        />
      </View>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5da2b0',
  },
  header: {
    flex: 1,
    paddingVertical: 80,
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
  },
  body: {
    flex: 5,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bodyContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
});
