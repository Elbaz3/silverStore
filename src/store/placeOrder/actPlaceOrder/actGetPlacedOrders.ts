import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErorrHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";
import { TOrder } from "@customTypes/orderType";

type TResponse = TOrder[];

const actGetPlacedOrder = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, signal } = thunkApi;

    const { auth } = getState() as RootState;

    const userId = auth.user?.id;

    try {
      const res = await axios.get<TResponse>(
        `https://serverjson-production.up.railway.app/orders?userId=${userId}`,
        { signal }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actGetPlacedOrder;
