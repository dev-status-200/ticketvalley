import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import currencyReducer from './currency/currencySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
  },
})