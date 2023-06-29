// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import projectReducer from './projectSlice';
import skillsReducer from './certificateSlice';
import certificateSlice from './certificateSlice';

const rootReducer = combineReducers({
  employee: employeeReducer,
  project: projectReducer,
  skills: skillsReducer,
  certificates: certificateSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;