import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddTaskApi, AddTeamApi, BASE_URL, GetAllTeamsApi } from "../endPoints";

export const addTeam = createAsyncThunk(
  "add/addTeam",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(AddTeamApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAllTeams = createAsyncThunk(
  "get/getAllTeams",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(GetAllTeamsApi);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
