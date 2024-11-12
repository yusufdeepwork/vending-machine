import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  buyProduct,
  refund,
  selectProduct,
  addMoney,
} from '@app-redux/vendingSlice'
import Display from '@app-components/Display'
import Product from '@app-components/Product'
import MoneyButton from '@app-components/MoneyButton'
import Button from '@app-components/Button'
import { Products, MoneyValues, Texts } from '@/shared/constants'
import { RootState } from '@/redux/store'

const VendingMachine: React.FC = () => {
  const dispatch = useDispatch()

  const handleSelectProduct = (name: string, price: number) => {
    dispatch(selectProduct({ name, price }))
  }

  const { selectedProduct, totalMoney } = useSelector(
    (state: RootState) => state.vending
  )

  const isBuyDisabled =
    Number(selectedProduct?.price) > totalMoney || !selectedProduct
  const isRefundDisabled = !selectedProduct || totalMoney === 0

  return (
    <div className="flex gap-2 flex-col ">
      <div className="bg-gray-900 text-white p-6 rounded-lg gap-4 shadow-lg flex flex-col items-center max-w-sm w-full">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {Products.map((product) => (
            <Product
              key={product.name}
              {...product}
              onSelect={handleSelectProduct}
            />
          ))}
        </div>

        <Display />
        <div className="flex gap-4">
          <Button
            onClick={() => dispatch(buyProduct())}
            disabled={isBuyDisabled}
          >
            {Texts.BUY_BUTTON}
          </Button>
          <Button
            onClick={() => dispatch(refund())}
            disabled={isRefundDisabled}
          >
            {Texts.REFUND_BUTTON}
          </Button>
        </div>
      </div>

      <div
        className={`flex gap-4 flex-wrap flex-row items-center justify-center ${
          !selectedProduct ? 'opacity-50 pointer-events-none' : ''
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
