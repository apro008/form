import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Textinput from '../component/Textinput.js';
import Button from '../component/Button.js';

import {useSelector, useDispatch} from 'react-redux';
import {fnameReducer, lnameReducer, addressReducer} from '../redux/stateSlice';

const Screen2 = ({navigation}) => {
  const [fName, setFname] = React.useState('');
  const [validFname, setValidFname] = React.useState('');

  const [lName, setLName] = React.useState('');
  const [validlName, setValidlName] = React.useState('');

  const [address, setAddress] = React.useState('');
  const [validAddress, setValidAddress] = React.useState('');

  const handleValidCheck = (val, whatToCheck) => {
    let fnameRegex = /^[A-Za-z]{2,50}$/;
    let lnameRegex = /^[A-Za-z]{1,50}$/;
    let addressRegex = /[0-9a-zA-Z]{10,}/;

    if (whatToCheck === 'checkFname') {
      if (val.length === 0) {
        setValidFname('Required. Allow only alphabets. ');
      } else if (fnameRegex.test(val) === false) {
        setValidFname('Minimum of 2 character and maximum 50, only alphabets');
        dispatch(fnameReducer(''));
      } else if (fnameRegex.test(val) === true) {
        setValidFname('');
        dispatch(fnameReducer(val));
      }
    }

    if (whatToCheck === 'checkLname') {
      if (val.length === 0) {
        setValidlName('Optional. If not empty,');
      } else if (lnameRegex.test(val) === false) {
        setValidlName(' only alphabets allowed');
        dispatch(lnameReducer(''));
      } else if (lnameRegex.test(val) === true) {
        setValidlName('');
        dispatch(lnameReducer(val));
      }
    }

    if (whatToCheck === 'checkAddress') {
      if (val.length === 0) {
        setValidAddress('Required. ');
      } else if (addressRegex.test(val) === false) {
        setValidAddress('Minimum length 10');
        dispatch(addressReducer(''));
      } else if (addressRegex.test(val) === true) {
        setValidAddress('');
        dispatch(addressReducer(val));
      }
    }
  };

  const dispatch = useDispatch();

  const {firstNameData, lastNameData, addressData} = useSelector(
    state => state.stateData,
  );

  // console.log(`firstNameData`, firstNameData);
  // console.log(`lastNameData`, lastNameData);
  // console.log(`addressData`, addressData);

  const handleSaveNext = () => {
    if (firstNameData.length >= 2 && addressData.length >= 10) {
      navigation.navigate('Screen3');
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
            value={fName}
            onChangeText={value => {
              setFname(value);
              handleValidCheck(value, 'checkFname');
            }}
            placeholder="First Name..."
            text="Enter your First Name"
            validText={validFname}
          />
          <Textinput
            value={lName}
            onChangeText={value => {
              setLName(value);
              handleValidCheck(value, 'checkLname');
            }}
            placeholder="Last Name..."
            text="Enter your Last Name"
            validText={validlName}
          />
          <Textinput
            value={address}
            onChangeText={value => {
              setAddress(value);
              handleValidCheck(value, 'checkAddress');
            }}
            placeholder="Address..."
            text="Enter your Address"
            validText={validAddress}
          />
        </View>
        <Button
          name="Go back"
          propStyle={{justifyContent: 'center', marginBottom: 10}}
          onPress={() => navigation.goBack()}
        />
        <Button
          name="Save and next"
          propStyle={{justifyContent: 'center'}}
          onPress={handleSaveNext}
        />
      </View>
    </View>
  );
};

export default Screen2;

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
