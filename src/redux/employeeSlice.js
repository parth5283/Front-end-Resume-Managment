// employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    // Define initial state for employee details form
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    zipcode: '',
    profilesummary: ''
    // Add more fields as needed
  },
  reducers: {
    // Add reducer functions to update the form fields
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
    // Add more reducers as needed
  },
});

export const { updateName,updateEmail,updatePhoneNumber,updateAddress,updateZipCode,updateProfileSummary } = employeeSlice.actions;
export default employeeSlice.reducer;