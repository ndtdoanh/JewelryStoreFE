import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    promotion: null,
};

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.promotion = action.payload;
        },
        clearCategory: (state) => {
            state.promotion = null;
        },
    },
});

export const { setCategory, clearCategory } = promotionSlice.actions;
export default promotionSlice.reducer;