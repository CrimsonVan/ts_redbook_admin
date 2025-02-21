import { useState, useEffect } from 'react'
export function useMovie() {
  const [movie, setMovie] = useState('黑暗骑士')
  useEffect(() => {
    setTimeout(() => {
      setMovie('重庆森林')
    }, 1000)
  }, [])
  return { movie }
}
