import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';
import projectReducer from './projectReducer';



export default combineReducers({
  employeeReducer,
  projectReducer,
});