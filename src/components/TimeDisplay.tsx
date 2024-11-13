interface TimeDisplayProps {
  time: number | string
  label: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, label }) => {
  return (
    <div className="flex w-24 items-center justify-center bg-gray-600 p-4 rounded-lg gap-1">
      <span className="w-8">{time}</span>
      <span className="text-xs">{label}</span>
    </div>
  )
}

export default TimeDisplay
