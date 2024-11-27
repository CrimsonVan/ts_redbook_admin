import './movie.scss'
function Movie() {
  type id = {
    id: string
  }
  type person = id & {
    name: string
    age?: number
  }
  type categorys<T> = {
    title: string
    nums: number
    arrlist: T[]
  }
  const jack: person = {
    id: '12138',
    name: 'jack'
  }
  const fruits: categorys<number> = {
    title: 'fruits',
    nums: 11,
    arrlist: [1, 2, 4]
  }
  console.log('打印fruits', typeof fruits.arrlist[0])

  console.log('打印jack', typeof jack.id)

  return (
    <div className="movie">
      <div className="left">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div className="middle">1</div>
      <div className="right">1</div>
    </div>
  )
}

export default Movie
