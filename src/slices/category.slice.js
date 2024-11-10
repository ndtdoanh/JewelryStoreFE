import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        clearCategory: (state) => {
            state.category = null;
        },
    },
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;