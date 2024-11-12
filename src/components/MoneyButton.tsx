import React from 'react'

interface MoneyButtonProps {
  amount: number
  onClick: () => void
}

const MoneyButton: React.FC<MoneyButtonProps> = ({ amount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-full w-14 h-14 flex items-center justify-center bg-gray-300 text-gray-800 font-bold text-lg border-4 border-gray-400 shadow-lg transition-transform transform hover:scale-110"
    >
      {amount}
    </div>
  )
}

export default MoneyButton
