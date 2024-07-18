import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: NavState = {
  open: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleNav } = navSlice.actions;

export default navSlice.reducer;
