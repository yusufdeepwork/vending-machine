import Button from '@/components/Button'
import { Texts } from '@/shared/constants'

interface SupplyPanelProps {
  handleResetMachine: () => void
  handleCollectMoney: () => void
  isDisabled: boolean
}
const SupplyPanel = ({
  handleCollectMoney,
  handleResetMachine,
  isDisabled,
}: SupplyPanelProps) => {
  return (
    <div
      className={`flex gap-2 w-full  justify-center ${
        isDisabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <Button color="gray-400" onClick={handleResetMachine}>
        {Texts.RESET_BUTTON}
      </Button>
      <Button color="gray-400" onClick={handleCollectMoney}>
        {Texts.COLLECT_MONEY_BUTTON}
      </Button>
    </div>
  )
}

export default SupplyPanel
