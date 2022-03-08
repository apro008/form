import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  emailData: '',
  passwordData: '',
  firstNameData: '',
  lastNameData: '',
  addressData: '',
  countryCodeData: '',
  phoneNumberData: '',
};

export const stateSlice = createSlice({
  name: 'stateData',
  initialState,
  reducers: {
    emailReducer: (state, {payload}) => {
      state.emailData = payload;
    },
    PasswordReducer: (state, {payload}) => {
      state.passwordData = payload;
    },
    fnameReducer: (state, {payload}) => {
      state.firstNameData = payload;
    },
    lnameReducer: (state, {payload}) => {
      state.lastNameData = payload;
    },
    addressReducer: (state, {payload}) => {
      state.addressData = payload;
    },
    countryCodeReducer: (state, {payload}) => {
      state.countryCodeData = payload;
    },
    phonenumberReducer: (state, {payload}) => {
      state.phoneNumberData = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  emailReducer,
  PasswordReducer,
  fnameReducer,
  lnameReducer,
  addressReducer,
  countryCodeReducer,
  phonenumberReducer,
} = stateSlice.actions;

export default stateSlice.reducer;
