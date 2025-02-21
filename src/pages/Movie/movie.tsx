import './movie.less'
import styled from 'styled-components'
import cn from 'classnames'
import { useMovie } from './myHooks'
function Movie() {
  const { movie } = useMovie()
  return (
    <>
      <div className="movie">{movie}</div>
      <StyledComp>
        <div
          className={cn('test', {
            'active-class': true,
            'non-active': false
          })}
        ></div>
      </StyledComp>
    </>
  )
}

const StyledComp = styled.div`
  height: 56px;
  background-color: pink;
  display: flex;
  .test {
    width: 30px;
    background-color: green;
    &.active-class {
      background-color: blue;
    }
  }
`
export default Movie
