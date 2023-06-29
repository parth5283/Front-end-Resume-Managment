export const saveEmployeeDetails = (employee) => {
    return {
      type: 'SAVE_EMPLOYEE_DETAILS',
      payload: employee,
    };
  };