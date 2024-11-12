import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { formatMoney } from '../shared/utils'
import { Texts } from '../shared/constants'

const Display: React.FC = () => {
  const { refundedMoney, selectedProduct, status, totalMoney } = useSelector(
    (state: RootState) => state.vending
  )

  const renderText = () => {
    if (status === 'refundedMoney') {
      return (
        <p className="text-green-500">{Texts.REFUND_MESSAGE(refundedMoney)}</p>
      )
    }

    if (status === 'completedOperation') {
      return (
        <div className="text-green-500">
          {Texts.OPERATION_COMPLETED}
          <p>{Texts.REFUND_MESSAGE(refundedMoney)}</p>
          <p>{Texts.SELECT_PRODUCT_PROMPT}</p>
        </div>
      )
    }

    if (totalMoney === 0 && !!selectedProduct) return <p>{Texts.NEED_MONEY}</p>

    const refundAmount = totalMoney - Number(selectedProduct?.price)

    return (
      totalMoney > 0 &&
      !!selectedProduct && (
        <>
          <p>
            {Texts.ADD_MONEY_PROMPT} {formatMoney(totalMoney)}
          </p>
          <p>
            {refundAmount > 0
              ? Texts.OPERATION_COMPLETED_REFUND_MESSAGE(refundAmount)
              : null}
          </p>
        </>
      )
    )
  }

  return (
    <div className="flex bg-gray-800 text-white p-4 h-20 items-center justify-center flex-col rounded-lg text-center">
      <p>
        {selectedProduct
          ? Texts.SELECTED_PRODUCT_PROMPT(selectedProduct.name)
          : status !== 'completedOperation' && Texts.SELECT_PRODUCT_PROMPT}
      </p>
      {renderText()}
    </div>
  )
}

export default Display
