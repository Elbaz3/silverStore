import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErorrHandler from "@util/isAxiosErrorHandler";

const actGetProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    try {
      const response = await axios.get(
        `https://serverjson-production.up.railway.app/products?cat_prefix=${prefix}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actGetProducts;
