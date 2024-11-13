import React, { useState, useEffect } from 'react'
import TimeDisplay from './TimeDisplay'
import { Texts } from '@/shared/constants'

interface TimerProps {
  duration: number
  onFinish: () => void
  isActive: boolean
}

const Timer: React.FC<TimerProps> = ({ duration, onFinish, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration)
    }
  }, [isActive, duration])

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish()
      return
    }

    if (isActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft, onFinish, isActive, duration])

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time)

  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto">
      <p className="text-white text-lg font-semibold">İşlem için kalan süre</p>
      <div className="flex gap-4 text-white text-sm font-bold items-center">
        <TimeDisplay time={formatTime(minutes)} label={Texts.MINUTE} />
        <TimeDisplay time={formatTime(seconds)} label={Texts.SECOND} />
      </div>
    </div>
  )
}

export default Timer
