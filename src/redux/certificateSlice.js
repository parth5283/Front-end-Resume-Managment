// skillsandcertificatesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const certificateSlice = createSlice({
  name: 'certificate',
  initialState: {
    // Define initial state for employee details form
    certificationName: '',
      certificationStartDate: '',
      certificationExpiryDate: '',
      
      certificates:[],
   
  },
  reducers: {
    // Add reducer functions to update the form fields
    updateCertificationName: (state, action) => {
      state.certificationName = action.payload;
    },
    updateCertificationStartDate: (state, action) => {
      state.certificationStartDate = action.payload;
    },
    updateCertificationEndDate: (state, action) => {
        state.certificationExpiryDate = action.payload;
      },
      
      addSkillsCertificates: (state, action) => {
        state.certificates = [...state.certificates, action.payload];
      },
      
      resetCertificateState: (state) => {
        state.certificationName = '';
        state.certificationStartDate = '';
        state.certificationExpiryDate = '';
        state.certificates = [];
      },
  },
});

export const { updateCertificationName,updateCertificationStartDate,updateCertificationEndDate,addSkillsCertificates,resetCertificateState} = certificateSlice.actions;
export default certificateSlice.reducer;