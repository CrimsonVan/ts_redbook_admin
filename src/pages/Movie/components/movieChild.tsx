import Styles from './movieChild.module.less'
import { memo } from 'react'
function MovieChild({
  testUseCallback,
  testUseMemoizedFn
}: {
  testUseCallback: any
  testUseMemoizedFn: any
}) {
  console.log('子组件MovieChild渲染')
  return (
    <>
      <div className={Styles['movie-child']}>
        <button onClick={testUseCallback}>testUseCallback</button>
        <button onClick={testUseMemoizedFn}>testUseMemoizedFn</button>
      </div>
    </>
  )
}

export default memo(MovieChild)
