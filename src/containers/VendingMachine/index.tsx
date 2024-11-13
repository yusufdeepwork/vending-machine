import React from 'react'
import Display from '@/containers/VendingMachine/Display'
import TemperatureControl from '@/components/Temperature'
import EnergyIndicator from '@/components/EnergyIndicator'
import Timer from '@app-components/Timer'
import useVendingMachine from '@/hooks/useVendingMachine'
import MoneyList from './MoneyList'
import ControlPanel from './ControlPanel'
import SupplyPanel from './SupplyPanel'
import ProductList from './ProductList'

const VendingMachine: React.FC = () => {
  const {
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
    handleAddMoney,
    isTimerActive,
    energyConsumption,
    isMoneyEnteringDisabled,
  } = useVendingMachine()

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
        <ProductList
          handleSelectProduct={handleSelectProduct}
          isMaximumEnergyExceed={isMaximumEnergyExceed}
        />

        <Display isMaximumEnergyExceed={isMaximumEnergyExceed} />
        <ControlPanel
          handleBuy={handleBuy}
          handleRefund={handleRefund}
          isBuyDisabled={isBuyDisabled}
          isRefundDisabled={isRefundDisabled}
        />
        <div className="w-60">
          <Timer
            isActive={isTimerActive}
            duration={300000}
            onFinish={handleTimerFinish}
          />
        </div>
        <SupplyPanel
          handleCollectMoney={handleCollectMoney}
          handleResetMachine={handleResetMachine}
          isDisabled={isMaximumEnergyExceed}
        />
      </div>

      <MoneyList
        isMoneyEnteringDisabled={isMoneyEnteringDisabled}
        handleAddMoney={handleAddMoney}
      />
    </div>
  )
}

export default VendingMachine
