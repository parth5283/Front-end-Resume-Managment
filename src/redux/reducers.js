const initialState = {
  employeeDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_EMPLOYEE_DETAILS':
      return {
        ...state,
        employeeDetails: action.payload,
      };
    case 'CLEAR_EMPLOYEE_DETAILS':
      return {
        ...state,
        employeeDetails: {},
      };
    default:
      return state;
  }
};



export default reducer;