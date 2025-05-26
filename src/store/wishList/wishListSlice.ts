import { TProduct } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishItems from "./act/actGetWishItems";
import { authLogout } from "@store/auth/authSlice";
import { TLoading } from "@customTypes/shared";

interface IWishList {
   itemsId: number[] ,
   productsFullInfo: TProduct[] ,
   isLoading: TLoading,
   error: string | null
}

const initialState: IWishList = {
   itemsId: [],
   productsFullInfo: [],
   isLoading: 'idle',
   error: null
}

const wishListSlice = createSlice({
   name: 'wishList',
   initialState,
   reducers: {
      wishListCleanup: (state) => {
         state.productsFullInfo = []
      }
   },
   extraReducers: (builder) => {
      builder.addCase(actLikeToggle.pending, (state) => {
         state.isLoading = 'pending'
         state.error = null
      })
      builder.addCase(actLikeToggle.fulfilled, (state, action) => {
         state.isLoading = 'succeeded'
         if (action.payload.type === 'add') {
            state.itemsId.push(action.payload.id)
         } else if (action.payload.type === 'delete') {
            state.itemsId = state.itemsId.filter((id) => id !== action.payload.id)
            state.productsFullInfo = state.productsFullInfo.filter((product) => product.id !== action.payload.id)
         }
      })
      builder.addCase(actLikeToggle.rejected, (state, action) => {
         state.isLoading = 'failed'
         state.error = action.error.message || 'An unexpected error'
      })
      builder.addCase(actGetWishItems.pending, (state) => {
         state.isLoading = 'pending'
         state.error = null
      })
      builder.addCase(actGetWishItems.fulfilled, (state, action) => {
         state.isLoading = 'succeeded'
         
         
         if (action.payload.dataType === 'productsIds') {
            state.itemsId = action.payload.data as number[]
         } else if (action.payload.dataType === 'ProductsFullInfo'){
            state.productsFullInfo = action.payload.data as TProduct[]
         } else {
            state.itemsId = []
            state.productsFullInfo = []
         }
      })
      builder.addCase(actGetWishItems.rejected, (state, action) => {
         state.isLoading = 'failed'
         state.error = action.error.message || 'An unexpected error'
      })

      // logout cleanup
      builder.addCase(authLogout, (state) => {
         state.productsFullInfo = []
         state.itemsId = []
      })
   }
})



export const { wishListCleanup } = wishListSlice.actions
export { actLikeToggle, actGetWishItems }
export default wishListSlice.reducer
