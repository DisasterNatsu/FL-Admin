import { configureStore } from "@reduxjs/toolkit";
import NavReducer from "@/redux/slices/NavSlice";
import authReducer from "@/redux/slices/AuthSlice";

export const store = configureStore({
  reducer: {
    navState: NavReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
