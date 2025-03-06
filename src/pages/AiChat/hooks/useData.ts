// // import { useEffect, useState useRef } from 'react'
// // import { produce } from 'immer'
// // import { getParams, getWebsocketUrl } from '../utils'
// // import { useSelector } from 'react-redux'
// import { io } from 'socket.io-client'
// // import { socket1 } from '../utils'
// export function useAiData() {
//   // const socket1 = io('http://127.0.0.1:3052')
//   // const userInfo = useSelector((state: any) => state.todoStore.userInfo)
//   // const socket1 = useSelector((state: any) => state.todoStore.socket)
//   // console.log('socket1', socket1)
//   // console.log('socket', socket1)
//   // const [isDark, setIsDark] = useState<any>(
//   //   localStorage.getItem('AI_IS_DARK') ? localStorage.getItem('AI_IS_DARK') : 'true'
//   // )
//   const [isStream, setIsStream] = useState<any>(false)
//   const [msg, setMsg] = useState<string>('')
//   const [aiName, setAiName] = useState<string>('讯飞星火大模型')
//   const [chatList, setChatList] = useState<any>([
//     {
//       role: 'assistant',
//       content: '你好有什么问题都可以问我哈'
//     }
//   ])
//   const socket1 = useRef(io('http://127.0.0.1:3052'))
//   useEffect(() => {
//     socket1.current = io('http://127.0.0.1:3052')
//     //链接后端socket
//     console.log('开始加入后端')
//     socket1.current.emit('join', 'crimsonvan')
//     socket1.current.on('message', (res: any) => {
//       console.log('打印toOneMsg', res)
//       // if (res.isFirst === 'true') {
//       //   console.log('打印第一个信息', res.choices[0].delta.content, res)
//       //   setChatList(
//       //     produce((draft: any) => {
//       //       draft.push({
//       //         role: 'assistant',
//       //         content: res.choices[0].delta.content
//       //       })
//       //     })
//       //   )
//       // } else {
//       //   console.log('打印其他信息', res.choices[0].delta.content, res)
//       //   setChatList(
//       //     produce((draft: any) => {
//       //       draft[draft.length - 1].content =
//       //         draft[draft.length - 1].content + res.choices[0].delta.content
//       //     })
//       //   )
//       // }
//     })
//     //动态设置css的vh单位大小
//     const vh = window.innerHeight * 0.01
//     document.documentElement.style.setProperty('--vh', `${vh}px`)
//   }, [])

//   // useEffect(() => {
//   //   socket1.current.on('message', (res: any) => {
//   //     console.log('打印toOneMsg', res)
//   //     // if (res.isFirst === 'true') {
//   //     //   console.log('打印第一个信息', res.choices[0].delta.content, res)
//   //     //   setChatList(
//   //     //     produce((draft: any) => {
//   //     //       draft.push({
//   //     //         role: 'assistant',
//   //     //         content: res.choices[0].delta.content
//   //     //       })
//   //     //     })
//   //     //   )
//   //     // } else {
//   //     //   console.log('打印其他信息', res.choices[0].delta.content, res)
//   //     //   setChatList(
//   //     //     produce((draft: any) => {
//   //     //       draft[draft.length - 1].content =
//   //     //         draft[draft.length - 1].content + res.choices[0].delta.content
//   //     //     })
//   //     //   )
//   //     // }
//   //   })
//   // }, [socket1])

//   // useEffect(() => {
//   //   const scrollbottom = () => {
//   //     setTimeout(() => {
//   //       let el = dom.current
//   //       if (el.scrollHeight) {
//   //         el.scrollTop = el.scrollHeight
//   //       } else {
//   //         return
//   //       }
//   //     }, 100)
//   //   }
//   //   scrollbottom()
//   // }, [chatList])

//   // const sendQues = (msg: string) => {
//   //   console.log('sendQues', msg)
//   //   // setChatList(
//   //   //   produce((draft: any) => {
//   //   //     draft.push({
//   //   //       role: 'user',
//   //   //       content: msg
//   //   //     })
//   //   //   })
//   //   // )
//   //   // setIsStream(true)
//   //   // let myUrl = getWebsocketUrl() as string
//   //   // let socket = new WebSocket(myUrl)
//   //   // socket.onopen = (event) => {
//   //   //   console.log('连接启动', event)
//   //   //   socket?.send(
//   //   //     JSON.stringify(
//   //   //       getParams([
//   //   //         ...chatList.slice(-2),
//   //   //         {
//   //   //           role: 'user',
//   //   //           content: msg
//   //   //         }
//   //   //       ])
//   //   //     )
//   //   //   )
//   //   //   let AIreply: string
//   //   //   socket.addEventListener('message', (event) => {
//   //   //     let data = JSON.parse(event.data)
//   //   //     if (data.header.code !== 0) {
//   //   //       socket.close()
//   //   //       setIsStream(false)
//   //   //     }
//   //   //     if (data.header.code === 0) {
//   //   //       if (data.payload.choices.text && data.header.status === 0) {
//   //   //         AIreply = data.payload.choices.text[0].content
//   //   //         setChatList(
//   //   //           produce((draft: any) => {
//   //   //             draft.pop()
//   //   //             draft.push({
//   //   //               role: 'assistant',
//   //   //               content: AIreply
//   //   //             })
//   //   //           })
//   //   //         )
//   //   //       }
//   //   //       //ai发送进行中
//   //   //       if (data.payload.choices.text && data.header.status === 1) {
//   //   //         AIreply += data.payload.choices.text[0].content
//   //   //         setChatList(
//   //   //           produce((draft: any) => {
//   //   //             draft[draft.length - 1].content = AIreply
//   //   //           })
//   //   //         )
//   //   //       }
//   //   //       // 对话已经完成
//   //   //       if (data.payload.choices.text && data.header.status === 2) {
//   //   //         AIreply += data.payload.choices.text[0].content
//   //   //         setChatList(
//   //   //           produce((draft: any) => {
//   //   //             draft[draft.length - 1].content = AIreply
//   //   //           })
//   //   //         )
//   //   //         setTimeout(() => {
//   //   //           AIreply = ''
//   //   //           socket.close()
//   //   //           console.log('对话关闭')
//   //   //           setIsStream(false)
//   //   //         }, 1000)
//   //   //       }
//   //   //     }
//   //   //   })
//   //   // }
//   // }

//   const sendToDeepseek = () => {
//     socket1.current.emit('msg', {
//       toUsername: 'crimsonvan',
//       content: '说一下峰哥'
//     })
//   }
//   // useEffect(() => {
//   // 接受对方发来的一对一消息

//   // }, [])

//   return {
//     chatList,
//     msg,
//     setMsg,
//     aiName,
//     setAiName,
//     isStream,
//     setIsStream,
//     isDark,
//     setIsDark,
//     sendToDeepseek
//   }
// }
