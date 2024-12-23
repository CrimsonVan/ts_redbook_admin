import { Modal } from 'antd'
import { useState } from 'react'
import React, { useImperativeHandle } from 'react'
import './CommentView.scss'
const CommentView = (props: any, ref: any) => {
  console.log('打印父传子的函数参数', props)
  useImperativeHandle(ref, () => ({
    showModal
  }))
  //帖子详情弹窗是否显示
  const [isModalOpen, setIsModalOpen] = useState(false)
  //当前帖子信息
  const [curComment, setCurComment] = useState<any>()
  //显示弹窗操作
  const showModal = (comment: any) => {
    console.log('打印view的comment', comment)
    setCurComment(comment)
    setIsModalOpen(true)
  }
  //修改贴文状态为通过
  const handleOk = () => {
    setIsModalOpen(false)
  }
  //修改贴文状态为未通过
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // avatar
  // :
  // "http://47.109.186.26:3007/uploads/b903b8599bbee78786cb4cee8f7090ae"
  // child_length
  // :
  // 0
  // comment_id
  // :
  // 184
  // content
  // :
  // "牛"
  // key
  // :
  // 184
  // nick_name
  // :
  // "向南墙"
  // parent_comment_id
  // :
  // 0
  // post_id
  // :
  // 120
  // post_nickname
  // :
  // "开心鸡肉卷"
  // preContent
  // :
  // "牛"
  // reply_comment_id
  // :
  // 0
  // reply_nickname
  // :
  // "开心鸡肉卷"
  // reply_username
  // :
  // "0"
  // username
  // :
  // "13114209344"
  return (
    <Modal
      width={500}
      okText="通过"
      cancelText="关闭"
      title="评论详情"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={true}
    >
      <div className="comment">
        <img src={curComment?.avatar} alt="" className="comment_avatar" />
        <div className="comment_main">
          <div className="comment_name">{curComment?.nick_name}</div>
          <div className="comment_content">{curComment?.content}</div>
          <div className="comment_bottom">昨天 10:12 北京</div>
        </div>
      </div>
    </Modal>
  )
}
export default React.forwardRef(CommentView)
