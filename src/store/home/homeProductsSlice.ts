import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetHomeProducts from "./actGetHomeProducts";

interface IHomeProductState {
  products: {
    featured: TProduct[];
    latest: TProduct[];
    reviews: TProduct[];
  };
  loading: TLoading;
  error: string | null;
}

const initialState: IHomeProductState = {
  products: {
    featured: [],
    latest: [],
    reviews: [],
  },
  loading: "idle",
  error: null,
};

const homeProductsSlice = createSlice({
  name: "homeProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetHomeProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetHomeProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products.featured = action.payload.featured;
        state.products.latest = action.payload.latest;
        state.products.reviews = action.payload.reviews;
      })
      .addCase(actGetHomeProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An unexpected error";
      });
  },
});

export { actGetHomeProducts };
export default homeProductsSlice.reducer;
