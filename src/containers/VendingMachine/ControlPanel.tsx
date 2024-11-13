import Button from '@/components/Button'
import { Texts } from '@/shared/constants'

interface ControlPanelProps {
  isBuyDisabled: boolean
  isRefundDisabled: boolean
  handleBuy: () => void
  handleRefund: () => void
}

const ControlPanel = ({
  handleBuy,
  handleRefund,
  isBuyDisabled,
  isRefundDisabled,
}: ControlPanelProps) => {
  return (
    <div className="flex gap-4">
      <Button onClick={handleBuy} disabled={isBuyDisabled}>
        {Texts.BUY_BUTTON}
      </Button>
      <Button onClick={handleRefund} disabled={isRefundDisabled}>
        {Texts.REFUND_BUTTON}
      </Button>
    </div>
  )
}

export default ControlPanel
