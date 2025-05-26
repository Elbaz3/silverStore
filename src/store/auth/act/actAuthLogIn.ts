import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErorrHandler from "@util/isAxiosErrorHandler";

type TData = {
  email: string;
  password: string;
};

type TResponse = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  accessToken: string;
};

const actAuthLogIn = createAsyncThunk(
  "auth/actAuthLogIn",
  async (data: TData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await axios.post<TResponse>(
        "https://serverjson-production.up.railway.app/login",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actAuthLogIn;
