import { configureStore } from "@reduxjs/toolkit";
import navBarReducer from "../slices/navBarSlice";

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    navBar: navBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
