import { useEffect, useState } from 'react'
import { getWebsocketUrl, getParams } from '../utils'
import { produce } from 'immer'
export function useAiData(dom: any) {
  const [isDark, setIsDark] = useState<any>(
    localStorage.getItem('AI_IS_DARK') ? localStorage.getItem('AI_IS_DARK') : 'true'
  )
  const [isStream, setIsStream] = useState<any>(false)
  const [msg, setMsg] = useState<string>('')
  const [aiName, setAiName] = useState<string>('讯飞星火大模型')
  const [chatList, setChatList] = useState<any>([
    {
      role: 'assistant',
      content: '你好有什么问题都可以问我哈'
    }
  ])
  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])
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
          role: 'user',
          content: msg
        })
        draft.push({
          role: 'loading'
        })
      })
    )
    setIsStream(true)
    let myUrl = getWebsocketUrl() as string
    let socket = new WebSocket(myUrl)
    socket.onopen = (event) => {
      console.log('连接启动', event)
      socket.send(
        JSON.stringify(
          getParams([
            ...chatList.slice(-2),
            {
              role: 'user',
              content: msg
            }
          ])
        )
      )
      let AIreply: string
      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data)
        if (data.header.code !== 0) {
          socket.close()
          setIsStream(false)
        }
        if (data.header.code === 0) {
          if (data.payload.choices.text && data.header.status === 0) {
            AIreply = data.payload.choices.text[0].content
            setChatList(
              produce((draft: any) => {
                draft.pop()
                draft.push({
                  role: 'assistant',
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
              setIsStream(false)
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
    setMsg,
    aiName,
    setAiName,
    isStream,
    setIsStream,
    isDark,
    setIsDark
  }
}
