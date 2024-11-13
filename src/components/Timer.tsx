import React, { useEffect } from 'react'
import TimeDisplay from './TimeDisplay'
import { Texts } from '@/shared/constants'
import useTimer from '@/hooks/useTimer'

interface TimerProps {
  duration: number
  onFinish: () => void
  isActive: boolean
}

const Timer: React.FC<TimerProps> = ({ duration, onFinish, isActive }) => {
  const { timeLeft, reset } = useTimer(duration, isActive, onFinish)

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time)

  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  useEffect(() => {
    reset()
  }, [isActive])

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto">
      <p className="text-white text-lg font-semibold">{Texts.REMAINING_TIME}</p>
      <div className="flex gap-4 text-white text-sm font-bold items-center">
        <TimeDisplay time={formatTime(minutes)} label={Texts.MINUTE} />
        <TimeDisplay time={formatTime(seconds)} label={Texts.SECOND} />
      </div>
    </div>
  )
}

export default Timer
