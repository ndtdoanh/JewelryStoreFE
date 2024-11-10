import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    warranty: null,
};

const warrantySlice = createSlice({
    name: "warranty",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.warranty = action.payload;
        },
        clearCategory: (state) => {
            state.warranty = null;
        },
    },
});

export const { setCategory, clearCategory } = warrantySlice.actions;
export default warrantySlice.reducer;