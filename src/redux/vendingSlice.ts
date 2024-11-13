import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type VendingStatus =
  | 'waitingMoney'
  | 'waitingSelectingProduct'
  | 'selectedProduct'
  | 'completedOperation'
  | 'insufficientFunds'
  | 'refundedMoney'

interface VendingState {
  totalMoney: number
  selectedProduct: { name: string; price: number } | null
  refundedMoney: number
  status: VendingStatus
  temperatureLevel: number
  energyConsumption: number
}

const initialState: VendingState = {
  totalMoney: 0,
  selectedProduct: null,
  refundedMoney: 0,
  status: 'waitingSelectingProduct',
  temperatureLevel: 1,
  energyConsumption: 2,
}

export const vendingSlice = createSlice({
  name: 'vending',
  initialState,
  reducers: {
    addMoney: (state, action: PayloadAction<number>) => {
      state.totalMoney += action.payload
      if (
        state.selectedProduct &&
        state.totalMoney < state.selectedProduct.price
      ) {
        state.status = 'insufficientFunds'
      } else {
        state.status = 'waitingMoney'
      }
    },
    selectProduct: (
      state,
      action: PayloadAction<{ name: string; price: number }>
    ) => {
      state.selectedProduct = action.payload
      state.status = 'waitingMoney'
      state.totalMoney = 0
      state.refundedMoney = 0
    },
    buyProduct: (state) => {
      if (
        state.selectedProduct &&
        state.totalMoney >= state.selectedProduct.price
      ) {
        state.totalMoney -= state.selectedProduct.price
        state.refundedMoney = state.totalMoney
        state.status = 'completedOperation'
        state.selectedProduct = null
      } else {
        state.status = 'insufficientFunds'
      }
    },
    refund: (state) => {
      if (state.totalMoney > 0) {
        state.status = 'refundedMoney'
      } else {
        state.status = 'waitingSelectingProduct'
      }
      state.refundedMoney = state.totalMoney
      state.totalMoney = 0
      state.selectedProduct = null
    },
    setTemperatureLevel: (state, action: PayloadAction<number>) => {
      if (action.payload > state.temperatureLevel) {
        state.energyConsumption =
          state.energyConsumption +
          (action.payload - state.temperatureLevel) * 2
      } else {
        state.energyConsumption =
          state.energyConsumption -
          (state.temperatureLevel - action.payload) * 2
      }
      state.temperatureLevel = action.payload
    },
  },
})

export const {
  addMoney,
  selectProduct,
  buyProduct,
  refund,
  setTemperatureLevel,
} = vendingSlice.actions

export default vendingSlice.reducer