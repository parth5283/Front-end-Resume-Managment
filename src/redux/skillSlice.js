import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  skills: [], // Make sure this line is present
  // Other properties...
};
const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    updateSkills: (state, action) => {
      state.skills = [...state.skills, action.payload];
    },
  },
});
export const resetSkills = () => ({
  type: 'skill/resetSkills',
});
export const { updateSkills } = skillSlice.actions;
export default skillSlice.reducer;