// hooks/useTimer.ts
import { useEffect, useState, useRef } from 'react'

const useTimer = (
  duration: number,
  isActive: boolean,
  onFinish: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const timerId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration)
      timerId.current = setInterval(
        () => setTimeLeft((prev) => prev - 1000),
        1000
      )
    }

    return () => {
      if (timerId.current) clearInterval(timerId.current)
    }
  }, [isActive, duration])

  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      onFinish()
      if (timerId.current) clearInterval(timerId.current)
    }
  }, [timeLeft, isActive, onFinish])

  const reset = () => {
    setTimeLeft(duration)
  }

  return { timeLeft, setTimeLeft, reset }
}

export default useTimer
