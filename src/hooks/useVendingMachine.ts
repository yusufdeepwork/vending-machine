import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  buyProduct,
  refund,
  selectProduct,
  addMoney,
  setTemperatureLevel,
  startTimer,
  stopTimer,
  resetMachine,
  collectMoney,
} from '@app-redux/vendingSlice'
import { RootState } from '@/redux/store'
import { EnergyLevels } from '@/shared/constants'

const useVendingMachine = () => {
  const dispatch = useDispatch()

  const {
    selectedProduct,
    totalMoney,
    temperatureLevel,
    energyConsumption,
    isTimerActive,
  } = useSelector((state: RootState) => state.vending)

  const isMaximumEnergyExceed = useMemo(
    () => energyConsumption >= EnergyLevels[EnergyLevels.length - 1],
    [energyConsumption]
  )

  const isBuyDisabled = useMemo(
    () =>
      (selectedProduct?.price as number) > totalMoney ||
      !selectedProduct ||
      isMaximumEnergyExceed,
    [selectedProduct, totalMoney, isMaximumEnergyExceed]
  )

  const isRefundDisabled = useMemo(
    () => !selectedProduct || totalMoney === 0 || isMaximumEnergyExceed,
    [selectedProduct, totalMoney, isMaximumEnergyExceed]
  )

  const handleSelectProduct = (name: string, price: number) => {
    dispatch(selectProduct({ name, price }))
    dispatch(startTimer())
  }

  const handleTemperatureChange = (level: number) => {
    dispatch(setTemperatureLevel(level))
  }

  const handleTimerFinish = () => {
    if (selectedProduct) {
      dispatch(refund())
    }
    dispatch(stopTimer())
  }

  const handleBuy = () => {
    dispatch(buyProduct())
  }

  const handleRefund = () => {
    dispatch(refund())
  }

  const handleResetMachine = () => {
    dispatch(resetMachine())
  }

  const handleCollectMoney = () => {
    dispatch(collectMoney())
  }

  const handleAddMoney = (amount: number) => {
    dispatch(addMoney(amount))
  }

  return {
    selectedProduct,
    totalMoney,
    temperatureLevel,
    isMaximumEnergyExceed,
    isBuyDisabled,
    isRefundDisabled,
    handleSelectProduct,
    handleTemperatureChange,
    handleTimerFinish,
    handleBuy,
    handleRefund,
    handleResetMachine,
    handleCollectMoney,
    isTimerActive,
    handleAddMoney,
    energyConsumption,
  }
}

export default useVendingMachine
