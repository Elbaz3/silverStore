import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategory } from "@customTypes/category";
import axiosErorrHandler from "@util/isAxiosErrorHandler";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    try {
      const response = await axios.get<TResponse>(
        "https://serverjson-production.up.railway.app/categories",
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actGetCategories;
