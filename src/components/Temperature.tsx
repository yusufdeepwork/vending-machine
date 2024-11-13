import { TemperatureLevels, Texts } from '@/shared/constants'

interface TemperatureProps {
  onTemperatureChange: (level: number) => void
  temperatureLevel: number
}

const TemperatureControl = ({
  onTemperatureChange,
  temperatureLevel,
}: TemperatureProps) => {
  const handleLevelClick = (level: number) => {
    onTemperatureChange(level)
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        {Texts.COLDNESS}
        <div className="flex space-x-1 mt-2">
          {TemperatureLevels.map((lvl) => (
            <div
              key={lvl}
              className={`w-6 h-6 text-center bg-white rounded-full cursor-pointer level-indicator level-${lvl} ${
                lvl <= temperatureLevel ? '' : 'opacity-30'
              }`}
              onClick={() => handleLevelClick(lvl)}
            >
              ❄️
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemperatureControl
