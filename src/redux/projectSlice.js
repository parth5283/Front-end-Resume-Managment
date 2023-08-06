import { createSlice } from '@reduxjs/toolkit';


const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projectName: '',
    startDate: '',
    endDate: '',
    technologiesUsed: [],
    rolesAndResponsibilities: '',
    projectDescription: '',
    projects: [],
  },
  reducers: {
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
    resetProjectState: (state) => {
      state.projectName = '';
      state.startDate = '';
      state.endDate = '';
      state.technologiesUsed = [];
      state.rolesAndResponsibilities = '';
      state.projectDescription = '';
      state.projects = [];
    },
  },
});



export const { updateProjectName, updateStartDate, updateEndDate, updateTechnologiesUsed, updateRolesAndResponsbilities, updateProjectDescription, addProject, resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;