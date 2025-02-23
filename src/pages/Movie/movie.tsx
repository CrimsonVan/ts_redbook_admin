import Styles from './movie.module.less'
import styled from 'styled-components'
import cn from 'classnames'
import { useData } from './hooks/useData'
import { useFullscreen } from 'ahooks'
import { useEffect, useRef } from 'react'
import MovieChild from './components/movieChild'
import PaginationComp from '../../global/myAntd/PaginationCom'
import CheckBoxGroup from '../../global/myAntd/CheckboxComp'
import { useClickOutside } from '../../global/myHooks/useClickOutside'
function Movie() {
  //isOpen
  //需要全屏的Dom
  const fullScreenDom = useRef<any>(null)
  //熟悉useFullscreen
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(fullScreenDom, {
    pageFullscreen: true
  })
  //测试自定义hooks
  const {
    allOptions,
    defaultCheckedList,
    userInfo,
    useMemoArr,
    setStatus,
    movie,
    setMovie,
    runAsync,
    testUseCallback,
    testUseMemoizedFn,
    open,
    setOpen
  } = useData()

  useEffect(() => {
    console.log('获取dom', fullScreenDom.current.clientHeight)
  }, [])

  //二次封装的antd的回调
  function onChange(page_num: number) {
    console.log('测试二次封装antd回调', page_num)
  }
  //dom
  const btnDom = useRef(null)
  //winDom
  const winDom = useRef(null)
  //点击dom外触发事件得到钩子
  useClickOutside(btnDom, winDom, () => {
    setOpen(false)
  })
  return (
    <>
      <div className={Styles.movie}>
        <div className={cn(Styles['movie-item'], { [Styles.active]: true })}></div>
      </div>

      <div className={Styles.movie2} ref={fullScreenDom}>
        {isFullscreen ? '全屏中' : '不在全屏中'}
        <button onClick={toggleFullscreen}>切换全屏</button>
      </div>

      <CheckBoxGroup
        type="link"
        boxOptions={allOptions}
        defaultCheckedList={defaultCheckedList}
        isTitle={false}
        onFinished={(e: any) => {
          console.log('确认后的回调', e)
        }}
      />
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
      <button ref={btnDom} onClick={() => setOpen(true)}>
        open
      </button>
      {open && <PopComp ref={winDom}>弹窗</PopComp>}
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
const PopComp = styled.div`
  width: 170px;
  height: 100px;
  background-color: palegoldenrod;
  box-sizing: border-box;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Movie
