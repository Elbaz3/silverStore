import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading } from "@customTypes/shared";
import { TCategory } from "@customTypes/category";
import { isString } from "@customTypes/guards";

interface ICategoriesState {
   records: TCategory[],
   loading: TLoading,
   error: string | null

}

const initialState: ICategoriesState = {
   records: [],
   loading: 'idle',
   error: null,
}

const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   reducers: {
      cleanCategories: (state) => {
         state.records = []
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(actGetCategories.pending, (state) => {
            state.loading = 'pending'
            state.error = null
         })
         .addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.records = action.payload
         })
         .addCase(actGetCategories.rejected, (state, action) => {
            state.loading = 'failed'
            if (isString(action.payload)) {
               state.error = action.payload;
            }
         })
   }
})

export const { cleanCategories } = categoriesSlice.actions
export { actGetCategories }
export default categoriesSlice.reducer;