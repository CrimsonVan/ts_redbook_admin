import Styles from './movie.module.less'
import styled from 'styled-components'
import cn from 'classnames'
import { useData } from './hooks/useData'
import { useSize, useFullscreen } from 'ahooks'
import { useEffect, useRef } from 'react'
import MovieChild from './components/movieChild'
import PaginationComp from '../../global/myAntd/PaginationCom'
function Movie() {
  //熟悉useRef
  const domRef = useRef<any>(null)
  //需要全屏的Dom
  const fullScreenDom = useRef<any>(null)
  //熟悉useFullscreen
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(fullScreenDom, {
    pageFullscreen: true
  })
  //测试自定义hooks
  const {
    userInfo,
    useMemoArr,
    setStatus,
    movie,
    setMovie,
    runAsync,
    testUseCallback,
    testUseMemoizedFn
  } = useData()

  //熟悉useSize
  const size = useSize(domRef)
  useEffect(() => {
    if (size) {
      console.log('测试useSize和dom', size, domRef.current)
    }
  }, [domRef.current])

  //二次封装的antd的回调
  function onChange(page_num: number) {
    console.log('测试二次封装antd回调', page_num)
  }

  return (
    <>
      <div className={Styles.movie}>
        <div className={cn(Styles['movie-item'], { [Styles.active]: true })}></div>
      </div>
      <div>
        <div className={Styles.movie2} ref={fullScreenDom}>
          {isFullscreen ? '全屏中' : '不在全屏中'}
          <button onClick={toggleFullscreen}>切换全屏</button>
        </div>
      </div>

      <StyleComp>
        <div className="sc-item">{userInfo.id}</div>
        <MovieChild
          testUseCallback={testUseCallback}
          testUseMemoizedFn={testUseMemoizedFn}
        ></MovieChild>
      </StyleComp>
      <div>
        <button onClick={() => testUseCallback()}>useCallback</button>
      </div>
      <div>
        <button onClick={() => runAsync()}>runAsync</button>
      </div>
      <div>
        <button onClick={() => setMovie()}>切换</button>
      </div>
      <p>{movie}</p>
      <div>
        <button onClick={() => setStatus()}>筛选</button>
      </div>
      {useMemoArr.map((item, index) => (
        <div key={index} className={Styles['list-item']}>
          {item}
        </div>
      ))}
      <PaginationComp pageSize={8} total={99} onChange={onChange}></PaginationComp>
    </>
  )
}

const StyleComp = styled.div`
  height: 100px;
  background-color: green;
  position: sticky;
  display: flex;
  overflow: hidden;
  .sc-item {
    width: 40px;
    background-color: yellowgreen;
  }
`

export default Movie
