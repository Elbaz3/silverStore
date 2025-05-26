import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";



interface ICartState {
   items: {[key: string]: number},
   fullProductInfo: TProduct[],
   totalQuantity: number,
   totalPrice: number,
   loading: TLoading,
   error:  string | null
}

const initialState: ICartState = {
   items: {},
   fullProductInfo: [],
   totalQuantity: 0,
   totalPrice: 0,
   loading: 'idle',
   error: null
}


const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const {id, price} = action.payload;

         if (state.items[id]) {
            if (state.items[id] >=3) {
               state.error = 'You can only add 3 items of the same product';
            } else {
               state.items[id]++;
               state.totalQuantity++;
               state.totalPrice += price
               state.error = null
            }
         } else {
            state.items[id] = 1;
            state.totalQuantity++;
            state.totalPrice += price
            state.error = null
         }
      },
      changeQuantity: (state, action) => {
         const { id, quantity } = action.payload;
         const oldQuantity = state.items[id] || 0
         const price = state.fullProductInfo.find((el) => el.id === id )?.price
         state.items[id] = quantity
         state.totalQuantity += quantity - oldQuantity
         state.totalPrice += (quantity - oldQuantity) * (price || 0)
      },
      deleteItem: (state, action) => {
         const id = action.payload
         const price = state.fullProductInfo.find((el) => el.id === id )?.price
         const quantity = state.items[id]
         state.totalQuantity = state.totalQuantity - quantity
         state.totalPrice = state.totalPrice -  ((price || 0 )* quantity)
         delete state.items[id]
         const products = state.fullProductInfo.filter((el) => el.id !== id)
         state.fullProductInfo = products
      },
      cleanCart: (state) => {
         state.fullProductInfo = []
         state.items = {}
         state.totalPrice = 0
         state.totalQuantity = 0
      },
      cleanCartProductFullInfo: (state) => {
         state.fullProductInfo = []
      }
   },
   extraReducers: (builder) => {
      builder
      .addCase(actGetProductsByItems.pending, (state) => {
         state.loading = 'pending'
         state.error = null
      })
      .addCase(actGetProductsByItems.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.fullProductInfo = action.payload
      })
      .addCase(actGetProductsByItems.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = action.error.message || "An unexpected error"
      })
   }
})


export const { addToCart, changeQuantity, deleteItem, cleanCartProductFullInfo, cleanCart } = cartSlice.actions;
export { actGetProductsByItems }
export default cartSlice.reducer;