import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
