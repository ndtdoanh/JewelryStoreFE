import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const { setOrder, clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
