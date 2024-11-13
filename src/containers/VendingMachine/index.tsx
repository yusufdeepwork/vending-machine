import React, { useMemo } from 'react'
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
import Display from '@/containers/VendingMachine/Display'
import Product from '@app-components/Product'
import MoneyButton from '@app-components/MoneyButton'
import Button from '@app-components/Button'
import { Products, MoneyValues, Texts, EnergyLevels } from '@/shared/constants'
import { RootState } from '@/redux/store'
import TemperatureControl from '@/components/Temperature'
import EnergyIndicator from '@/components/EnergyIndicator'
import Timer from '@app-components/Timer'

const VendingMachine: React.FC = () => {
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

  return (
    <div className="flex gap-2 flex-col ">
      <div className="bg-gray-900 text-white p-6 rounded-lg gap-4 shadow-lg flex flex-col items-center max-w-sm w-full">
        <div className="flex justify-between w-full">
          <TemperatureControl
            temperatureLevel={temperatureLevel}
            onTemperatureChange={handleTemperatureChange}
          />
          <EnergyIndicator energyLevel={energyConsumption} />
        </div>
        <div
          className={`flex items-center justify-center gap-4 flex-wrap ${
            isMaximumEnergyExceed ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {Products.map((product) => (
            <Product
              key={product.name}
              {...product}
              onSelect={handleSelectProduct}
            />
          ))}
        </div>

        <Display isMaximumEnergyExceed={isMaximumEnergyExceed} />
        <div className="flex gap-4">
          <Button onClick={handleBuy} disabled={isBuyDisabled}>
            {Texts.BUY_BUTTON}
          </Button>
          <Button onClick={handleRefund} disabled={isRefundDisabled}>
            {Texts.REFUND_BUTTON}
          </Button>
        </div>

        <div className="w-60">
          <Timer
            isActive={isTimerActive}
            duration={300000}
            onFinish={handleTimerFinish}
          />
        </div>
        <div className="flex gap-2 w-full  justify-center">
          <Button color="gray-400" onClick={handleResetMachine}>
            {Texts.RESET_BUTTON}
          </Button>
          <Button color="gray-400" onClick={handleCollectMoney}>
            {Texts.COLLECT_MONEY_BUTTON}
          </Button>
        </div>
      </div>

      <div
        className={`flex gap-4 flex-wrap flex-row items-center justify-center ${
          !selectedProduct || isMaximumEnergyExceed
            ? 'opacity-50 pointer-events-none'
            : ''
        }`}
      >
        {MoneyValues.map((amount) => (
          <MoneyButton
            key={amount}
            amount={amount}
            onClick={() => dispatch(addMoney(amount))}
          />
        ))}
      </div>
    </div>
  )
}

export default VendingMachine
