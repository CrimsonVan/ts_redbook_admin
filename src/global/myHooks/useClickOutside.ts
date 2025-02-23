import { useEffect } from 'react'
export function useClickOutside(dom: any, winDom: any, cb: any) {
  useEffect(() => {
    const handle = function (e: any) {
      if (e.target !== dom.current && e.target !== winDom.current) {
        cb()
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])
}
