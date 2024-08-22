import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddTaskApi, EditTasksApi, GetAllTasksApi } from "../endPoints";

export const addTask = createAsyncThunk(
  "add/addTask",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(AddTaskApi, data, {
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
export const deleteTask = createAsyncThunk(
  "add/deleteTask",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(EditTasksApi(id));
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const updateTask = createAsyncThunk(
  "add/updateTask",
  async (data, thunkApi) => {
    try {
      const response = await axios.patch(EditTasksApi(data.id), data.data, {
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
export const getAllTasks = createAsyncThunk(
  "get/getAllTasks",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(GetAllTasksApi);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
