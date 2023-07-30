
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import projectReducer from './projectSlice';
import formReducer from './projectSlice';
import skillsReducer from './skillSlice';
import certificateReducer from './certificateSlice';

const rootReducer = combineReducers({
  employee: employeeReducer,
  project: projectReducer,
  skill: skillsReducer,
  certificate: certificateReducer,
   form: formReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export const getSkills = () => store.getState().skill.skills;
export default store;