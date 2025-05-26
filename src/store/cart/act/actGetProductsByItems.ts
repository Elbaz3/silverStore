import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErorrHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkApi) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkApi;
    const { cart } = getState() as RootState;
    const items = Object.keys(cart.items);
    if (!items.length) {
      return fulfillWithValue([]);
    }

    try {
      const itemsId = items.map((item) => `id=${item}`).join("&");
      const response = await axios.get<TResponse>(
        `https://serverjson-production.up.railway.app/products?${itemsId}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actGetProductsByItems;
