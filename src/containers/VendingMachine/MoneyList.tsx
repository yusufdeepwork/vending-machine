import React from 'react'
import MoneyButton from '@/components/MoneyButton'
import { MoneyValues } from '@/shared/constants'

interface MoneyListProps {
  isMoneyEnteringDisabled: boolean
  handleAddMoney: (amount: number) => void
}

const MoneyList: React.FC<MoneyListProps> = React.memo(
  ({ isMoneyEnteringDisabled, handleAddMoney }) => {
    return (
      <div
        className={`flex gap-4 flex-wrap flex-row items-center justify-center ${
          isMoneyEnteringDisabled ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {MoneyValues.map((amount) => (
          <MoneyButton
            key={amount}
            amount={amount}
            onClick={() => handleAddMoney(amount)}
          />
        ))}
      </div>
    )
  }
)

export default MoneyList
