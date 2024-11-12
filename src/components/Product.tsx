import React from 'react'

interface ProductProps {
  name: string
  price: number
  imgSrc: string
  onSelect: (name: string, price: number) => void
}

const Product: React.FC<ProductProps> = ({ name, price, imgSrc, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(name, price)}
      className="bg-gray-700 text-white p-4 rounded-lg cursor-pointer gap-2 text-center w-24 flex items-center justify-center flex-col transform transition-all duration-200 hover:bg-gray-600 hover:scale-105"
    >
      <img
        src={imgSrc}
        alt={name}
        className="aspect-square max-w-20 object-scale-down"
      />
      <span className=" bg-slate-500 px-3 rounded ">{price} 🪙</span>
    </div>
  )
}

export default Product
