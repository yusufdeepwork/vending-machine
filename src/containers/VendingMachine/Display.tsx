import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { formatMoney } from '../../shared/utils'
import { Texts } from '../../shared/constants'

interface DisplayProps {
  isMaximumEnergyExceed: boolean
}

const Display = ({ isMaximumEnergyExceed }: DisplayProps) => {
  const { refundedMoney, selectedProduct, status, totalMoney } = useSelector(
    (state: RootState) => state.vending
  )

  const renderText = () => {
    if (isMaximumEnergyExceed) {
      return (
        <p className="text-red-500 text-center break-words whitespace-pre-wrap">
          {Texts.MAXIMUM_ENERGY_CONSUMPTION_ALERT}
        </p>
      )
    }
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
    <div className="flex w-full max-w-80 bg-gray-800 text-white p-4 md:h-20 h-auto min-h-20 items-center justify-center flex-col rounded-lg text-center">
      {!isMaximumEnergyExceed && (
        <p>
          {selectedProduct
            ? Texts.SELECTED_PRODUCT_PROMPT(selectedProduct.name)
            : status !== 'completedOperation' && Texts.SELECT_PRODUCT_PROMPT}
        </p>
      )}
      {renderText()}
    </div>
  )
}

export default Display
