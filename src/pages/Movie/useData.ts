import { useEffect, useMemo, useState } from 'react'
import { produce } from 'immer'
export function useData() {
  const [movie, setMovie] = useState('超人')
  const [status, setStatus] = useState<string>('是')
  useEffect(() => {
    //熟悉immer拷贝
    const data1 = {
      done: false,
      val: 'string',
      child: {
        name: 'lilei'
      }
    }
    const newData = produce(data1, (draft) => {
      draft.child.name = 'jack'
    })
    console.log('测试immer的深拷贝前', data1)
    console.log('测试immer的深拷贝后', newData)
  }, [])
  //熟悉useMemo
  //useMemo可以缓存计算结果，重新渲染时不再计算，减少性能损耗
  const useMemoArr = useMemo(() => {
    let startTime = performance.now()
    while (performance.now() - startTime < 500) {
      // 在 500 毫秒内不执行任何操作以模拟极慢的代码
    }
    const arr = ['是', '否', '是', '否']
    return arr.filter((item) => item === status)
  }, [status])

  //熟悉useMemoizedFn

  return { useMemoArr, setStatus, movie, setMovie }
}
