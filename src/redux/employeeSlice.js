import { createSlice } from '@reduxjs/toolkit';



const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    zipcode: '',
    profilesummary: ''
  },
  
  reducers: {

    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.phonenumber = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateZipCode: (state, action) => {
      state.zipcode = action.payload;
    },
    updateProfileSummary: (state, action) => {
      state.profilesummary = action.payload;
    },
  },
});



export const { updateName, updateEmail, updatePhoneNumber, updateAddress, updateZipCode, updateProfileSummary } = employeeSlice.actions;
export default employeeSlice.reducer;