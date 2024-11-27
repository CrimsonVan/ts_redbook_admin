import './son.scss'
interface Props {
  name: string
  age?: number
  // eslint-disable-next-line no-undef
  children?: React.ReactNode
  fun?: any
}
export function Son(props: Props) {
  const { name, age, children, fun } = props
  return (
    <div className="son">
      this is {name};age is {age}
      <div>{children}</div>
      <div>
        <button onClick={() => fun?.('11')}>子传父亲</button>
      </div>
    </div>
  )
}
