import { MoneyValues, Texts } from '@/shared/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type VendingStatus =
  | 'waitingMoney'
  | 'waitingSelectingProduct'
  | 'selectedProduct'
  | 'completedOperation'
  | 'insufficientFunds'
  | 'refundedMoney'

interface ProductProps {
  name: string
  price: number
}

interface VendingState {
  totalMoney: number
  selectedProduct: ProductProps | null
  refundedMoney: number
  status: VendingStatus
  temperatureLevel: number
  energyConsumption: number
  isTimerActive: boolean
  collectedMoney: number
}

const initialState: VendingState = {
  totalMoney: 0,
  selectedProduct: null,
  refundedMoney: 0,
  status: 'waitingSelectingProduct',
  temperatureLevel: 1,
  energyConsumption: 2,
  isTimerActive: false,
  collectedMoney: 0,
}

export const vendingSlice = createSlice({
  name: 'vending',
  initialState,
  reducers: {
    addMoney: (state, action: PayloadAction<number>) => {
      if (!MoneyValues.includes(action.payload)) alert(Texts.ENTER_VALID_MONEY)

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
        state.collectedMoney =
          state.selectedProduct.price + state.collectedMoney
        state.selectedProduct = null
      } else {
        state.status = 'insufficientFunds'
      }

      state.isTimerActive = false
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
      state.isTimerActive = false
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
    startTimer: (state) => {
      state.isTimerActive = true
    },
    stopTimer: (state) => {
      state.isTimerActive = false
    },
    resetMachine: (state) => {
      state.selectedProduct = null
      state.totalMoney = 0
      state.refundedMoney = 0
      state.status = 'waitingSelectingProduct'
      state.isTimerActive = false
    },
    collectMoney: (state) => {
      const password = prompt(Texts.ENTER_ADMIN_PASSWORD)
      const correctPassword = 'admin123' // Temporary solution for just showing that we need authorization

      if (password === correctPassword) {
        alert(`${Texts.COLLECTED_MONEY} ${state.collectedMoney} 🪙`)
        state.collectedMoney = 0
      } else {
        alert(Texts.INCORRECT_PASSWORD)
      }
    },
  },
})

export const {
  addMoney,
  selectProduct,
  buyProduct,
  refund,
  setTemperatureLevel,
  startTimer,
  stopTimer,
  resetMachine,
  collectMoney,
} = vendingSlice.actions

export default vendingSlice.reducer
