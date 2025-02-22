//手搓useMemoizedFn
import { useCallback } from 'react'
export function useMyCallBack(cb: any) {
  const fn = useCallback(cb, [])
  return fn
}
