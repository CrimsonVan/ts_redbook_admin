import { useRef, useState } from 'react'
import { Son } from '../../components/son'
import { type Arr } from '../../types/test'
import axios from 'axios'
import './testhome.scss'
function TestHome() {
  interface state {
    name: string
    age: number
  }
  function defineType<T>(args: T) {
    return typeof args
  }
  const arr: Arr[] = [
    { name: '1', age: 1 },
    { name: '222', age: 1 }
  ]
  let domRef = useRef<HTMLInputElement>(null)
  const [isShow, setisShow] = useState<boolean>(false)
  const showFunc = () => {
    setisShow(!isShow)
    setTimeout(() => {
      domRef.current?.focus()
    }, 100)
  }
  console.log('打印arr的name', typeof arr[0].name)

  const str = defineType<number>(22)
  const num = defineType(99)
  console.log('打印num和str', num, str)
  const [state, setState] = useState<state | null>({
    name: 'homestate',
    age: 18
  })
  let n = 19
  const tsFunc = async (props: string) => {
    let res = await axios.post('http://big-event-vue-api-t.itheima.net/api/login', {
      username: 'jsFather',
      password: '123456'
    })
    console.log('打印res', res)

    setState(state ? { ...state, name: props } : null)
    // console.log("获取dom", domRef.current?.value);
    domRef.current?.focus()

    let timber: number = setTimeout(() => {
      console.log('已删除timber')
      clearTimeout(timber)
    }, 1000)
  }
  return (
    <div className="Home">
      <div>
        this is {state?.name}
        <button onClick={() => tsFunc('props修改')}>修改</button>
      </div>
      <div>
        <input className={isShow ? 'inp' : 'hideinp'} ref={domRef} type="text" />
        <button onClick={() => showFunc()}>显示</button>
      </div>
      <Son name="父亲传儿子" age={n} fun={tsFunc}>
        <div>this is children</div>
      </Son>
    </div>
  )
}

export default TestHome
