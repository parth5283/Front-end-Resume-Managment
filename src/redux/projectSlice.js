// employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    // Define initial state for employee details form
    projectName: '',
    startDate: '',
    endDate: '',
    technologiesUsed: [],
    rolesAndResponsibilities: '',
    projectDescription: '',
    projects: [],
    // Add more fields as needed
  },
  reducers: {
    // Add reducer functions to update the form fields
    updateProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    updateStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    updateEndDate: (state, action) => {
        state.endDate = action.payload;
      },
      updateTechnologiesUsed: (state, action) => {
        state.technologiesUsed = action.payload;
      },
      updateRolesAndResponsbilities: (state, action) => {
        state.rolesAndResponsibilities = action.payload;
      },
      updateProjectDescription: (state, action) => {
        state.projectDescription = action.payload;
      },
      addProject: (state, action) => {
        state.projects = [...state.projects, action.payload];
      },
  },
});

export const { updateProjectName,updateStartDate,updateEndDate,updateTechnologiesUsed,updateRolesAndResponsbilities,updateProjectDescription ,addProject} = projectSlice.actions;
export default projectSlice.reducer;