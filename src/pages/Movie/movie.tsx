import Styles from './movie.module.less'
import styled from 'styled-components'
import cn from 'classnames'
import { useData } from './hooks/useData'
import { useFullscreen } from 'ahooks'
import { useRef } from 'react'
import MovieChild from './components/movieChild'
import PaginationComp from '../../global/myAntd/PaginationCom'
import CheckBoxGroup from '../../global/myAntd/CheckboxComp'
import { useClickOutside } from '../../global/myHooks/useClickOutside'
import { Link } from 'react-router-dom'
import { DatePicker, Button } from 'antd'
import { CvButton } from './myAntd/cvButton'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker
function Movie() {
  const dateFormat = 'YYYY-MM-DD'
  console.log('打印dayjs', dayjs('2019-08-01', dateFormat))
  // 限制日期函数
  const disabledDate = (current: any) => {
    return (
      current &&
      (current > dayjs('2020-12-01', dateFormat) || current < dayjs('2020-01-01', dateFormat))
    )
  }

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
    setOpen,
    loading
  } = useData()

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
  //日期选择
  const change = (e: any) => {
    console.log(
      '打印所选择的日期',
      e.map((item: any) => dayjs(item).format('YYYY-MM-DD'))
    )
  }
  return (
    <>
      <div>
        <Button>按钮</Button>
        <Button type="primary">按钮</Button>
        <Button danger>按钮</Button>
        <Button type="primary" danger>
          按钮
        </Button>
        <Button size="large">按钮</Button>
      </div>
      <div>
        <CvButton>按 钮</CvButton>
        <CvButton>按 钮</CvButton>
        <CvButton>按 钮</CvButton>
        <CvButton>按 钮</CvButton>
        <CvButton>按 钮</CvButton>
      </div>
      <div className={Styles.movie}>
        <div className={cn(Styles['movie-item'], { [Styles.active]: true })}></div>
      </div>

      <div className={Styles.movie2} ref={fullScreenDom}>
        {isFullscreen ? '全屏中' : '不在全屏中'}
        <button onClick={toggleFullscreen}>切换全屏</button>
      </div>
      <div>
        <Link to="/test">state</Link>
      </div>
      <CheckBoxGroup
        type="button"
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
      <div>{loading ? 'loading中' : 'loading结束'}</div>
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
      {open && (
        <PopComp ref={winDom} width="400px">
          弹窗
        </PopComp>
      )}
      <div>
        <RangePicker onChange={change} disabledDate={disabledDate} />
      </div>
    </>
  )
}

const StyleComp: any = styled.div`
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
const PopComp: any = styled.div`
  height: 100px;
  width: ${(props: any) => props.width || '150px'};
  background-color: palegoldenrod;
  box-sizing: border-box;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Movie
