import { useEffect, useMemo, useCallback } from 'react'
import { produce } from 'immer'
import { useRequest, useToggle, useMemoizedFn } from 'ahooks'
export function useData() {
  const [movie, { toggle: setMovie }] = useToggle('超人', '蝙蝠侠')
  const [status, { toggle: setStatus }] = useToggle('是', '否') //筛选条件
  function getUsername(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('jackMa')
      }, 1000)
    })
  }

  //熟悉useRequest获取异步数据
  const { run: runAsync } = useRequest(getUsername, {
    manual: true,
    onSuccess: (res) => {
      console.log('获取异步数据成功', res)
    }
  })

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
    //模拟极慢的代码
    // let startTime = performance.now()
    // while (performance.now() - startTime < 500) {
    //   // 在 500 毫秒内不执行任何操作以模拟极慢的代码
    // }
    const arr = ['是', '否', '是', '否']
    return arr.filter((item) => item === status)
  }, [status])

  //熟悉useCallback
  const testUseCallback = useCallback(() => {
    let startTime = performance.now()
    while (performance.now() - startTime < 500) {
      // 在 500 毫秒内不执行任何操作以模拟极慢的代码
    }
    console.log(`测试useCallBack成功`)
  }, [status])

  // 不用useCallback时
  // const testUseCallback = () => {
  //   let startTime = performance.now()
  //   while (performance.now() - startTime < 500) {
  //     // 在 500 毫秒内不执行任何操作以模拟极慢的代码
  //   }
  //   console.log(`测试useCallBack成功`)
  // }

  //熟悉useMemoizedFn
  const testUseMemoizedFn = useMemoizedFn(() => {
    let startTime = performance.now()
    while (performance.now() - startTime < 500) {
      // 在 500 毫秒内不执行任何操作以模拟极慢的代码
    }
    console.log(`测试useMemoizedFn成功`)
  })
  return { useMemoArr, setStatus, movie, setMovie, runAsync, testUseCallback, testUseMemoizedFn }
}
