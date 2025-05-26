import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetHomeProducts = createAsyncThunk(
  "homeProducts/getHo,eProducts",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    try {
      const response1 = await axios.get(
        "https://serverjson-production.up.railway.app/products?cat_prefix=men",
        { signal }
      );
      const response2 = await axios.get(
        "https://serverjson-production.up.railway.app/products?cat_prefix=women",
        { signal }
      );
      const response3 = await axios.get(
        "https://serverjson-production.up.railway.app/products?cat_prefix=kids",
        { signal }
      );
      const response = {
        featured: response1.data,
        latest: response2.data,
        reviews: response3.data,
      };

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export default actGetHomeProducts;
