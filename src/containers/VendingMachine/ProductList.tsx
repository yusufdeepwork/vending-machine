import React from 'react'
import Product from '@/components/Product'
import { Products } from '@/shared/constants'

interface ProductListProps {
  isMaximumEnergyExceed: boolean
  handleSelectProduct: (name: string, price: number) => void
}

const ProductList = React.memo(
  ({ isMaximumEnergyExceed, handleSelectProduct }: ProductListProps) => {
    return (
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
    )
  }
)

export default ProductList
