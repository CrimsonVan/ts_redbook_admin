import { useEffect, useMemo, useCallback, useState } from 'react'
import { produce } from 'immer'
import { useRequest, useToggle, useMemoizedFn } from 'ahooks'
import { useSelector } from 'react-redux'
// import { useMyCallBack } from '../../../utils/ahooks/myUseCallback'
export function useData() {
  const [movie, { toggle: setMovie }] = useToggle('超人', '蝙蝠侠')
  const [status, { toggle: setStatus }] = useToggle('是', '否') //筛选条件
  const [open, setOpen] = useState(false)
  const userInfo = useSelector((state: any) => state.todoStore.userInfo) //状态管理仓库获取状态

  //模拟异步任务
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
    },
    onBefore: () => {
      console.log('获取异步数据之前的回调')
    },
    onFinally: () => {
      console.log('获取异步数据结束的回调')
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
    console.log('开始状态的计算')
    const arr = ['是', '否', '是', '否']
    return arr.filter((item) => item === status)
  }, [status])

  //不使用useMemo时
  // function test1() {
  //   console.log('开始状态的计算')
  //   const arr = ['是', '否', '是', '否']
  //   return arr.filter((item) => item === status)
  // }
  // const useMemoArr = test1()

  //熟悉useCallback
  //根据依赖项，缓存代码执行后生成的函数，减少性能损耗
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
  //缓存代码执行后生成的函数，减少性能损耗
  const testUseMemoizedFn = useMemoizedFn(() => {
    let startTime = performance.now()
    while (performance.now() - startTime < 500) {
      // 在 500 毫秒内不执行任何操作以模拟极慢的代码
    }
    console.log(`测试useMemoizedFn成功`)
  })

  //测试二次封装的useCallback，模拟useMemoizedFn
  // const testUseMemoizedFn = useMyCallBack(() => {
  //   let startTime = performance.now()
  //   while (performance.now() - startTime < 500) {
  //     // 在 500 毫秒内不执行任何操作以模拟极慢的代码
  //   }
  //   console.log(`测试useMemoizedFn成功`)
  // })

  //所有选项
  const allOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' }
  ]
  //默认选项
  const defaultCheckedList = ['A', 'B', 'C']

  return {
    allOptions,
    defaultCheckedList,
    useMemoArr,
    setStatus,
    movie,
    setMovie,
    runAsync,
    testUseCallback,
    testUseMemoizedFn,
    userInfo,
    open,
    setOpen
  }
}
