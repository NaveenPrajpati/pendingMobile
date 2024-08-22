import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddEmployeApi, BASE_URL, GetAllEmployeApi } from "../endPoints";

export const addEmploye = createAsyncThunk(
  "add/addEmploye",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(AddEmployeApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAllEmploye = createAsyncThunk(
  "add/getAllEmploye",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(GetAllEmployeApi);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
