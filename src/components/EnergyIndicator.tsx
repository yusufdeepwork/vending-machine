import { EnergyLevels, Texts } from '@/shared/constants'

interface EnergyIndicatorProps {
  energyLevel: number
}

const EnergyIndicator = ({ energyLevel }: EnergyIndicatorProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        {Texts.ENERGY_LEVEL}
        <div className="flex space-x-1 mt-2 pointer-events-none">
          {EnergyLevels.map((level) => (
            <div
              key={level}
              className={`w-6 h-6 text-center bg-white rounded-full ${
                energyLevel >= level ? 'bg-yellow-500' : 'opacity-30'
              }`}
            >
              ⚡
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EnergyIndicator
