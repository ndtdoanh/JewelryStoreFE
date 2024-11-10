import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gift: null,
};

const giftSlice = createSlice({
    name: "gift",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.gift = action.payload;
        },
        clearCategory: (state) => {
            state.gift = null;
        },
    },
});

export const { setCategory, clearCategory } = giftSlice.actions;
export default giftSlice.reducer;