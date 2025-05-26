import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErorrHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

const actLikeToggle = createAsyncThunk<
  { type: "add" | "delete"; id: number },
  { id: number; userId: number }
>("wishList/actLikeToggle", async ({ id, userId }, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const isRecordExist = await axios.get(
      `https://serverjson-production.up.railway.app/wishlist?userId=${userId}&productId=${id}`
    );
    if (isRecordExist.data.length > 0) {
      await axios.delete(
        `https://serverjson-production.up.railway.app/wishlist/${isRecordExist.data[0].id}`
      );
      return { type: "delete", id };
    } else {
      await axios.post(
        `https://serverjson-production.up.railway.app/wishlist`,
        {
          userId: userId,
          productId: id,
        }
      );
      return { type: "add", id };
    }
  } catch (error) {
    return rejectWithValue(axiosErorrHandler(error));
  }
});

export default actLikeToggle;
