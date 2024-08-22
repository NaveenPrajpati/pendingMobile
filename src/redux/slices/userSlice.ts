import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDetail: {},
  boardView: "list",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setSectedDetails: (state, action) => {
      state.selectedDetail = action.payload;
    },
    setBoardView: (state, action) => {
      state.boardView = action.payload;
    },
  },
});

export const { setSectedDetails, setBoardView } = userSlice.actions;
export default userSlice.reducer;
