import { useEffect } from 'react'
import { produce } from 'immer'
export function useData() {
  useEffect(() => {
    const data = {
      done: false,
      val: 'string',
      child: {
        name: 'lilei'
      }
    }
    const newData = produce(data, (draft) => {
      draft.child.name = 'jack'
    })
    console.log('测试immer的深拷贝前', data)
    console.log('测试immer的深拷贝后', newData)
  }, [])
}
