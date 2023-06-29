import { createSlice } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
  name: 'skills',
  initialState: '',
  reducers: {
    updateSkills: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateSkills } = skillsSlice.actions;
export default skillsSlice.reducer;