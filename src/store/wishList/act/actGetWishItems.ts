import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import axiosErorrHandler from "@util/isAxiosErrorHandler";

type TDataType = "productsIds" | "ProductsFullInfo";

type TResponse = TProduct[];

const actGetWishItems = createAsyncThunk(
  "wishlist/actGetWishItems",
  async (dataType: TDataType, thunkApi) => {
    const { rejectWithValue, getState, signal } = thunkApi;
    const { auth } = getState() as RootState;

    if (!auth.accessToken) {
      return rejectWithValue("Unauthorized");
    }

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `https://serverjson-production.up.railway.app/wishlist?userId=${auth.user?.id}`,
        { signal }
      );
      if (!userWishlist.data.length) {
        return {
          data: [],
          dataType: "empty",
        };
      }
      if (dataType === "productsIds") {
        const itemsIds = userWishlist.data.map((items) => items.productId);

        return {
          data: itemsIds,
          dataType: "productsIds",
        };
      } else {
        const itemsId = userWishlist.data
          .map((item) => `id=${item.productId}`)
          .join("&");
        const products = await axios.get<TResponse>(
          `https://serverjson-production.up.railway.app/products?${itemsId}`
        );
        return {
          data: products.data,
          dataType: "ProductsFullInfo",
        };
      }
    } catch (error) {
      return rejectWithValue(axiosErorrHandler(error));
    }
  }
);

export default actGetWishItems;
