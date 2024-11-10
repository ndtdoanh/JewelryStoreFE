import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: null,
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    clearEmployee: (state) => {
      state.employee = null;
    },
  },
});

export const { setEmployee, clearEmployee } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
