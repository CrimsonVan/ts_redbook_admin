import Styles from './movie.module.less'
import styled from 'styled-components'
import cn from 'classnames'
import { useData } from './useData'
function Movie() {
  //自定义hooks
  useData()
  return (
    <>
      <div className={Styles['movie']}>
        <div className={cn(Styles['movie-item'], { [Styles.active]: true })}></div>
      </div>
      <div className={Styles.movie2}></div>
      <StyleComp>
        <div className="sc-item">test</div>
      </StyleComp>
    </>
  )
}

const StyleComp = styled.div`
  height: 100px;
  background-color: green;
  position: sticky;
  display: flex;
  .sc-item {
    width: 40px;
    background-color: yellowgreen;
  }
`

export default Movie
