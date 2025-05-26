import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/shared";
import { TProduct } from "@customTypes/product";
import actGetProducts from "./act/actGetProducts";

interface IProductsState {
  products: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  products: [],
  loading: "idle",
  error: null,
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.products = [];
    },
    productQuantityUpdate: (state, action) => {
      const id = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        if (product.max && product.max > 0) {
          product.max -= 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(actGetProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An unexpected error";
      });
  },
});

export const { productsCleanUp, productQuantityUpdate } = ProductsSlice.actions;
export { actGetProducts };
export default ProductsSlice.reducer;
