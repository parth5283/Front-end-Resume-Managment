import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    employeeDetails: null
}

const employeeReducer = createSlice({
    name: 'employeeReducer',
    initialState,
    reducers: {
        saveEmployeeDetails(state, action) {
            state = action.payload;
        }
    }
})

export const { saveEmployeeDetails } = employeeReducer.actions;
export default employeeReducer.reducer;
