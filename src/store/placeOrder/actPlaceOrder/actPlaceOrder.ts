import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErorrHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;

    const { cart, auth } = getState() as RootState;

    const userId = auth.user?.id;
    const items = cart.fullProductInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: el.id ? cart.items[el.id] : 0,
    }));

    try {
      const response = await axios.post(
        "https://serverjson-production.up.railway.app/orders",
        {
          userId,
          items,
          subtotal,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actPlaceOrder;
