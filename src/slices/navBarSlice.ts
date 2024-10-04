import { createSlice } from "@reduxjs/toolkit";

interface NavBarState {
  isNavClosed: boolean;
}

const initialState: NavBarState = {
  isNavClosed: false,
};

export const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isNavClosed = !state.isNavClosed;
    },
    closeNav: (state) => {
      state.isNavClosed = true;
    },
    openNav: (state) => {
      state.isNavClosed = false;
    },
  },
});

export const { toggleNav, closeNav, openNav } = navBarSlice.actions;
export default navBarSlice.reducer;
