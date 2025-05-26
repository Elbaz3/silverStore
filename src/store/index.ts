import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categoriesSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";
import authSlice from "./auth/authSlice";
import homeSlice from "./home/homeProductsSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishListReducer from "@store/wishList/wishListSlice";
import placeOrderReducer from "@store/placeOrder/placeOrderSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "totalQuantity", "totalPrice"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  categories: categoriesReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishList: wishListReducer,
  placeOrder: placeOrderReducer,
  homeProducts: homeSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
