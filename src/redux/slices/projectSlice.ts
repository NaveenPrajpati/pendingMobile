import { createSlice } from "@reduxjs/toolkit";
import {
  addProject,
  getAllProject,
} from "../../services/Operations/projectOperations";
import toast from "react-hot-toast";

const initialState = {
  allProjects: [],
  loadingProject: false,
  loadingTasks: false,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addProject.pending, (state, action) => {
      state.loadingProject = true;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.loadingProject = false;
      toast.success(action.payload.message);
      state.allProjects.push(action.payload.data);
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.loadingProject = false;
      toast.error(action.error);
    });

    builder.addCase(getAllProject.pending, (state, action) => {
      state.loadingProject = true;
    });
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      state.loadingProject = false;
      // toast.success(action.payload.message);
      state.allProjects = action.payload.data;
    });
    builder.addCase(getAllProject.rejected, (state, action) => {
      state.loadingProject = false;
      toast.error(action.error);
    });
  },
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
