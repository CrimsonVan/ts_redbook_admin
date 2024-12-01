import { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import store from '../../../store'
function Home() {
  console.log('渲染了')
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('打印count', count)

    setCount(-1)
  })
  const plusThree = () => {
    message.error('错误提示')
    console.log('redux token', store.getState())
    setCount(count + 1)
    setCount(count + 2)
    setCount(count + 3)
  }
  return (
    <div>
      <div>
        <span>{count}</span>
        <Button type="primary" onClick={plusThree}>
          加三
        </Button>
      </div>
    </div>
  )
}
export default Home
