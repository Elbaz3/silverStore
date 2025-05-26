import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actAuthSignUp from "./act/actAuthSignUp";
import actAuthLogIn from "./act/actAuthLogIn";
import { isString } from "@customTypes/guards";

interface IauthState {
   user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
   } | null,
   accessToken: string | null;
   loading: TLoading;
   error: string | null;
}

const initialState: IauthState = {
   user: {
      id: 0,
      firstName: '',
      lastName: '',
      email: ''
   },
   accessToken: '',
   loading: 'idle',
   error: null
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      resetUi: (state) => {
         state.loading = 'idle'
         state.error = null
      },
      authLogout: (state) => {
         state.user = null
         state.accessToken = null
      }

   },
   extraReducers: (builder) => {
      // signUp
      builder.addCase(actAuthSignUp.pending, (state) => {
         state.loading = 'pending'
         state.error = null
      })
      builder.addCase(actAuthSignUp.fulfilled, (state) => {
         state.loading = 'succeeded'
      })
      builder.addCase(actAuthSignUp.rejected, (state, action) => {
         state.loading = 'failed'
         if (isString(action.payload)) {
            state.error = action.payload
         }
      })

      // logIn
      builder.addCase(actAuthLogIn.pending, (state) => {
         state.loading = 'pending'
         state.error = null
      })
      builder.addCase(actAuthLogIn.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.user = action.payload.user
         state.accessToken = action.payload.accessToken
      })
      builder.addCase(actAuthLogIn.rejected, (state, action) => {
         state.loading = 'failed'
         if (isString(action.payload)) {
            state.error = action.payload
         }
      })
   }
})

export const { resetUi, authLogout } = authSlice.actions
export { actAuthSignUp, actAuthLogIn }
export default authSlice.reducer