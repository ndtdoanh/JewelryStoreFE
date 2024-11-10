import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: null,
};

const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    clearCounter: (state) => {
      state.counter = null;
    },
  },
});

export const { setCounter, clearCounter } = CounterSlice.actions;
export default CounterSlice.reducer;
