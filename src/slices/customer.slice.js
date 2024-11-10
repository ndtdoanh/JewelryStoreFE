import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    clearCustomer: (state) => {
      state.customer = null;
    },
  },
});

export const { setCustomer, clearCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;
