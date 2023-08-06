import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  skills: [],
};
const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    updateSkills: (state, action) => {
      state.skills = [...state.skills, action.payload];
    },
    resetSkillState: (state) => {

      state.skills = [];
    },
  },
});
export const resetSkills = () => ({
  type: 'skill/resetSkills',
});
export const { updateSkills, resetSkillState } = skillSlice.actions;
export default skillSlice.reducer;