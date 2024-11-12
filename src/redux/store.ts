import { configureStore } from '@reduxjs/toolkit'
import vendingReducer from './vendingSlice'

export const store = configureStore({
  reducer: {
    vending: vendingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
