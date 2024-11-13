import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  buyProduct,
  refund,
  selectProduct,
  addMoney,
  setTemperatureLevel,
  startTimer,
  stopTimer,
} from '@app-redux/vendingSlice'
import Display from '@app-components/Display'
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

  const isMaximumEnergyExceed =
    energyConsumption >= EnergyLevels[EnergyLevels.length - 1]

  const isBuyDisabled =
    Number(selectedProduct?.price) > totalMoney ||
    !selectedProduct ||
    isMaximumEnergyExceed

  const isRefundDisabled =
    !selectedProduct || totalMoney === 0 || isMaximumEnergyExceed

  const handleSelectProduct = (name: string, price: number) => {
    dispatch(selectProduct({ name, price }))
    dispatch(startTimer()) // Ürün seçildiğinde timer'ı başlat
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
        <div className='w-60'>
          <Timer
            isActive={isTimerActive}
            duration={300000}
            onFinish={handleTimerFinish}
          />
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
