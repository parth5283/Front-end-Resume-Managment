import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';
import projectReducer from '../reducers/projectReducer';
import certificateReducer from '../reducers/certificateReducer';
import skillReducer from '../reducers/skillReducer'
const rootReducer = combineReducers({
  employee: employeeReducer,
  project: projectReducer,
  certificate: certificateReducer,
  skill: skillReducer,
});

export default rootReducer;