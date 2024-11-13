import React from 'react'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  bgColor?: string
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled,
  bgColor = 'bg-red-500 ',
}) => (
  <button
    onClick={onClick}
    className={`${bgColor} text-white p-2 rounded-md w-28 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
