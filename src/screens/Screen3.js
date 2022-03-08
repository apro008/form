import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Button from '../component/Button.js';
import Textinput from '../component/Textinput.js';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import {countryCodeReducer, phonenumberReducer} from '../redux/stateSlice';

const Screen3 = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [validPhoneNumber, setValidPhoneNumber] = React.useState('');

  const [countryCode, setCountryCode] = React.useState('+1');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const dispatch = useDispatch();
  const {countryCodeData, phoneNumberData} = useSelector(
    state => state.stateData,
  );

  const {stateData} = useSelector(state => state);

  console.log(`stateData`, stateData);
  //console.log(`phoneNumberData`, phoneNumberData);

  const handleValidCheck = (val, whatToCheck) => {
    let phonNumberRegex = /^[0-9]{10}$/;

    if (whatToCheck === 'checkPhone') {
      if (val.length === 0) {
        setValidPhoneNumber('Required. ');
      } else if (phonNumberRegex.test(val) === false) {
        setValidPhoneNumber('only 10 digit numeric value allowed ');
        dispatch(phonenumberReducer(''));
      } else if (phonNumberRegex.test(val) === true) {
        setValidPhoneNumber('');
        dispatch(phonenumberReducer(val));
      }
    }
  };

  const handleValidSave = () => {
    if (phoneNumberData.length >= 10 && toggleCheckBox === true) {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome</Text>
      </View>
      <View style={styles.body}>
        <View
          style={{
            marginLeft: 20,
            marginTop: 10,
          }}>
          <Textinput
            value={phoneNumber}
            onChangeText={value => {
              setPhoneNumber(value);
              handleValidCheck(value, 'checkPhone');
            }}
            placeholder="Phone Number..."
            text="Enter your Phone number"
            validText={validPhoneNumber}
            keyboardType="number-pad"
          />
          <Picker
            selectedValue={countryCode}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) => {
              setCountryCode(itemValue);
              dispatch(countryCodeReducer(itemValue));
            }}>
            <Picker.Item label="+1 Us" value="1" />
            <Picker.Item label="+91 India" value="+91" />
          </Picker>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={setToggleCheckBox}
              style={styles.checkbox}
            />
            <TouchableOpacity>
              <Text style={styles.label}>Do you accept TermsAndCondition?</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>
                  {`${JSON.stringify(stateData)} \n \n \n Click to close`}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <Button
          name="Save"
          propStyle={{justifyContent: 'center', marginVertical: 10}}
          onPress={handleValidSave}
        />
        <Button
          name="Go back"
          propStyle={{justifyContent: 'center'}}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default Screen3;

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
  checkbox: {},
  label: {
    color: 'black',
    fontSize: 16,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
