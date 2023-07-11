  import { createSlice } from "@reduxjs/toolkit"

  const initialState = {
    projects:[],
  }
  
  const projectReducer = createSlice({
    name: 'projectReducer',
    initialState,
    reducers: {
      
        saveProjectDetails(state, action) {
          state.projectDetails = action.payload;
      },
      clearProjectDetails:(state) => initialState,
    }
  })

  export const { saveProjectDetails, clearProjectDetails } = projectReducer.actions;
  export default projectReducer.reducer;