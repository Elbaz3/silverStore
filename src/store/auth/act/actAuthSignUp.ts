import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErorrHandler from "@util/isAxiosErrorHandler";

type TData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthSignUp = createAsyncThunk(
  "auth/actAuthSignUp",
  async (data: TData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await axios.post(
        "https://serverjson-production.up.railway.app/register",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actAuthSignUp;
