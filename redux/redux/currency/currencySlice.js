import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
  conversion: {currency:'AED', rate:1.00},
}

export const currencySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCurrency: (state, action) => {
      state.value = action.payload;
    },
    changeCurrency: (state, action) => {
      state.conversion = action.payload;
    },
  }
})

export const { addCurrency, changeCurrency } = currencySlice.actions
export default currencySlice.reducer