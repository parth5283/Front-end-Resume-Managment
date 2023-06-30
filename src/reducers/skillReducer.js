import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  skills:[],
}

const skillReducer = createSlice({
  name: 'skillReducer',
  initialState,
  reducers: {
    
      saveSkills(state, action) {
      state = action.payload;
    }
  }
})

export const { saveSkills } = skillReducer.actions;
export default skillReducer.reducer;