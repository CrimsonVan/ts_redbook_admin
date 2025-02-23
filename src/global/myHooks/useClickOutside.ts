import { useEffect } from 'react'
export function useClickOutside(dom: any, cb: any) {
  useEffect(() => {
    const handle = function (e: any) {
      if (e.target !== dom.current) {
        cb()
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])
}
