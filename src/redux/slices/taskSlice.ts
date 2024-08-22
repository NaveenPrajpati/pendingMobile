import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/Operations/taskOperations";

const initialState = {
  allTasks: [],
  loadingTasks: false,
  errorTask: "",
};

const projectSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTask.pending, (state, action) => {
      state.loadingTasks = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loadingTasks = false;
      toast.success(action.payload.message);
      state.allTasks.push(action.payload.data);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loadingTasks = false;
      toast.error(action.error);
    });

    builder.addCase(getAllTasks.pending, (state, action) => {
      state.loadingTasks = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.loadingTasks = false;
      // toast.success(action.payload.message);
      state.allTasks = action.payload.data;
    });
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.loadingTasks = false;
      toast.error(action.error);
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.loadingTasks = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loadingTasks = false;

      state.allTasks = state.allTasks.filter(
        (it) => it._id != action.payload.data._id
      );
      toast.success(action.payload.message);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loadingTasks = false;
      toast.error(action.error);
    });
    builder.addCase(updateTask.pending, (state, action) => {
      state.loadingTasks = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const taskIndex = state.allTasks.findIndex(
        (task) => task._id === action.payload.data._id
      );
      if (taskIndex !== -1) {
        state.allTasks[taskIndex] = action.payload.data;
      }
      state.loadingTasks = false;
      toast.success(action.payload.message);
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loadingTasks = false;
      toast.error(action.error);
    });
  },
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
