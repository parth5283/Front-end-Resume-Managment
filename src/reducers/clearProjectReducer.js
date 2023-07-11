import { RESET_FORM_DATA } from '../redux/actions';

const initialState = {
  // Your initial form state goes here
};

const clearProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM_DATA:
      return initialState;
    default:
      return state;
  }
};

export default clearProjectReducer;