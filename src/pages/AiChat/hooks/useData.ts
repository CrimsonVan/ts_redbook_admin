import { useEffect, useState } from 'react'
import { getWebsocketUrl, getParams } from '../utils'
import { produce } from 'immer'
// import { SyncOutlined } from '@ant-design/icons'
export function useAiData(dom: any) {
  const [msg, setMsg] = useState<string>('')
  const [chatList, setChatList] = useState<any>([
    {
      user: 'ai',
      content: '你好我是讯飞星火大模型'
    }
  ])
  useEffect(() => {
    const scrollbottom = () => {
      setTimeout(() => {
        let el = dom.current
        if (el.scrollHeight) {
          el.scrollTop = el.scrollHeight
        } else {
          return
        }
      }, 100)
    }
    scrollbottom()
  }, [chatList])
  const sendQues = (msg: string) => {
    setChatList(
      produce((draft: any) => {
        draft.push({
          user: 'user',
          content: msg
        })
        draft.push({
          user: 'loading'
        })
      })
    )
    let myUrl = getWebsocketUrl() as string
    let socket = new WebSocket(myUrl)
    socket.onopen = (event) => {
      console.log('连接启动', event)
      socket.send(JSON.stringify(getParams(msg)))
      let AIreply: string
      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data)
        if (data.header.code !== 0) {
          socket.close()
        }
        if (data.header.code === 0) {
          if (data.payload.choices.text && data.header.status === 0) {
            AIreply = data.payload.choices.text[0].content
            setChatList(
              produce((draft: any) => {
                draft.pop()
                draft.push({
                  user: 'ai',
                  content: AIreply
                })
              })
            )
          }
          //ai发送进行中
          if (data.payload.choices.text && data.header.status === 1) {
            AIreply += data.payload.choices.text[0].content
            setChatList(
              produce((draft: any) => {
                draft[draft.length - 1].content = AIreply
              })
            )
          }
          // 对话已经完成
          if (data.payload.choices.text && data.header.status === 2) {
            AIreply += data.payload.choices.text[0].content
            setChatList(
              produce((draft: any) => {
                draft[draft.length - 1].content = AIreply
              })
            )
            setTimeout(() => {
              AIreply = ''
              socket.close()
              console.log('对话关闭')
            }, 1000)
          }
        }
      })
    }
  }
  return {
    sendQues,
    chatList,
    msg,
    setMsg
  }
}
