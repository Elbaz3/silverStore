import { TOrder } from "@customTypes/orderType";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./actPlaceOrder/actPlaceOrder";
import actGetPlacedOrder from "./actPlaceOrder/actGetPlacedOrders";

interface IPlaceOrder {
  orderList: TOrder[];
  loading: TLoading;
  error: string | null;
}

const initialState: IPlaceOrder = {
  orderList: [],
  loading: "idle",
  error: null,
};

const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // place orders
    builder
      .addCase(actPlaceOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actPlaceOrder.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actPlaceOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An unexpected error";
      })
      // get placed orders
      .addCase(actGetPlacedOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetPlacedOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orderList = action.payload;
      })
      .addCase(actGetPlacedOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An unexpected error";
      });
  },
});

export const { resetOrderState } = placeOrderSlice.actions;
export { actPlaceOrder, actGetPlacedOrder };
export default placeOrderSlice.reducer;
