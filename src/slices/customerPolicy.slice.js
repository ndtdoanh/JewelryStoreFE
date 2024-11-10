import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
};

const CustomerPolicySlice = createSlice({
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

export const { setCustomer, clearCustomer } = CustomerPolicySlice.actions;
export default CustomerPolicySlice.reducer;
