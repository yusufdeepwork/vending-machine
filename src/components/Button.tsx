import React from 'react'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean // disabled özelliği ekledik
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    className={`bg-red-500 text-white p-2 rounded-md w-24 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={disabled} // Butonun disabled olmasını sağlıyoruz
  >
    {children}
  </button>
)

export default Button
