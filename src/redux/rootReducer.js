import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  employee: employeeReducer,
  // Add other reducers here
});

export default rootReducer;