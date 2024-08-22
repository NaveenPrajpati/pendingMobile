import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GetAllProjectsApi } from "../endPoints";

export const addProject = createAsyncThunk(
  "add/project",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(BASE_URL + "/admin/addProject", data, {
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
export const getAllProject = createAsyncThunk(
  "get/allProject",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(GetAllProjectsApi);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
