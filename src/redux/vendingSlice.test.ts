import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from '@reduxjs/toolkit'
import vendingReducer, {
  addMoney,
  selectProduct,
  buyProduct,
  refund,
  setTemperatureLevel,
  startTimer,
  stopTimer,
  resetMachine,
  collectMoney,
  VendingState,
} from './vendingSlice'

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

describe('vendingSlice tests', () => {
  let store: any

  beforeEach(() => {
    store = createStore(vendingReducer, initialState)
  })

  it('should add money correctly', () => {
    store.dispatch(addMoney(5))
    expect(store.getState().totalMoney).toBe(5)
  })

  it('should change status to insufficientFunds if not enough money is added', () => {
    store.dispatch(selectProduct({ name: 'Snack', price: 10 }))
    store.dispatch(addMoney(5))
    expect(store.getState().status).toBe('insufficientFunds')
  })

  it('should buy product if enough money is added', () => {
    store.dispatch(selectProduct({ name: 'Snack', price: 5 }))
    store.dispatch(addMoney(5))
    store.dispatch(buyProduct())
    expect(store.getState().status).toBe('completedOperation')
    expect(store.getState().totalMoney).toBe(0)
  })

  it('should refund money correctly', () => {
    store.dispatch(addMoney(5))
    store.dispatch(refund())
    expect(store.getState().status).toBe('refundedMoney')
    expect(store.getState().totalMoney).toBe(0)
  })

  it('should select a product and reset total money to 0', () => {
    store.dispatch(selectProduct({ name: 'Water', price: 25 }))
    expect(store.getState().selectedProduct).toEqual({
      name: 'Water',
      price: 25,
    })
    expect(store.getState().totalMoney).toBe(0)
  })

  it('should update temperature level and adjust energy consumption correctly', () => {
    store.dispatch(setTemperatureLevel(3))
    expect(store.getState().temperatureLevel).toBe(3)
    expect(store.getState().energyConsumption).toBe(6)
  })

  it('should start the timer correctly', () => {
    store.dispatch(startTimer())
    expect(store.getState().isTimerActive).toBe(true)
  })

  it('should stop the timer correctly', () => {
    store.dispatch(stopTimer())
    expect(store.getState().isTimerActive).toBe(false)
  })

  it('should reset the machine correctly', () => {
    store.dispatch(selectProduct({ name: 'Coke', price: 35 }))
    store.dispatch(addMoney(35))
    store.dispatch(resetMachine())
    expect(store.getState().selectedProduct).toBeNull()
    expect(store.getState().totalMoney).toBe(0)
    expect(store.getState().refundedMoney).toBe(0)
    expect(store.getState().status).toBe('waitingSelectingProduct')
    expect(store.getState().isTimerActive).toBe(false)
  })

  it('should collect money if correct admin password is entered', () => {
    const originalPrompt = global.prompt
    global.prompt = () => 'admin123'

    store.dispatch(collectMoney())
    expect(store.getState().collectedMoney).toBe(0)

    global.prompt = originalPrompt
  })

  it('should reject money collection if incorrect password is entered', () => {
    const originalPrompt = global.prompt
    global.prompt = () => 'wrongpassword'

    store.dispatch(collectMoney())
    expect(store.getState().collectedMoney).toBe(0)

    global.prompt = originalPrompt
  })
})
