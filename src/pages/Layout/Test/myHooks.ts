import { useState, useEffect } from 'react'
//测试自定义hooks
export function useTest() {
  const [c, setC] = useState<string>('c')
  useEffect(() => {
    setC('ccc')
  }, [])
  return { c }
}
