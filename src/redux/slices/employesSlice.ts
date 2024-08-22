import { createSlice } from "@reduxjs/toolkit";
import { addProject } from "../../services/Operations/projectOperations";
import {
  addEmploye,
  getAllEmploye,
} from "../../services/Operations/employeOperation";
import { addTeam, getAllTeams } from "../../services/Operations/teamOperations";
import toast from "react-hot-toast";

const initialState = {
  loadingEmploye: false,
  allEmployes: [],
  allTeams: [],
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addEmploye.pending, (state, action) => {
      state.loadingEmploye = true;
    });
    builder.addCase(addEmploye.fulfilled, (state, action) => {
      state.allEmployes.push(action.payload.data);
      toast.success(action.payload.message);
      state.loadingEmploye = false;
    });
    builder.addCase(addEmploye.rejected, (state, action) => {
      state.loadingEmploye = false;
      toast.error(action.payload.error);
    });
    builder.addCase(addTeam.pending, (state, action) => {
      state.loadingEmploye = true;
    });
    builder.addCase(addTeam.fulfilled, (state, action) => {
      state.allTeams.push(action.payload.data);
      toast.success(action.payload.message);
      state.loadingEmploye = false;
    });
    builder.addCase(addTeam.rejected, (state, action) => {
      state.loadingEmploye = false;
      toast.error(action.payload.error);
    });
    builder.addCase(getAllEmploye.pending, (state, action) => {
      state.loadingEmploye = true;
    });
    builder.addCase(getAllEmploye.fulfilled, (state, action) => {
      state.loadingEmploye = true;
      state.allEmployes = action.payload.data;
    });
    builder.addCase(getAllEmploye.rejected, (state, action) => {
      state.loadingEmploye = false;
      toast.error(action.payload.error);
    });
    builder.addCase(getAllTeams.pending, (state, action) => {
      state.loadingEmploye = true;
    });
    builder.addCase(getAllTeams.fulfilled, (state, action) => {
      state.loadingEmploye = true;
      state.allTeams = action.payload.data;
    });
    builder.addCase(getAllTeams.rejected, (state, action) => {
      state.loadingEmploye = false;
      toast.error(action.payload.error);
    });
  },
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
