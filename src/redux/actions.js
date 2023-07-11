// actions.js
export const RESET_FORM_DATA = 'RESET_FORM_DATA';

export const resetFormData = () => {
  return {
    type: RESET_FORM_DATA,
  };
};
export const saveEmployeeDetails = (employee) => {
    return {
      type: 'SAVE_EMPLOYEE_DETAILS',
      payload: employee,
    };
  };