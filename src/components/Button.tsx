import React from 'react'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  color?: string
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled,
  color = 'red-500',
}) => (
  <button
    onClick={onClick}
    className={`bg-${color} text-white p-2 rounded-md w-28 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
