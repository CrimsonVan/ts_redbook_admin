import { Modal } from 'antd'
import { useState } from 'react'
import React, { useImperativeHandle } from 'react'
const CommentView = (props: any, ref: any) => {
  console.log('打印父传子的函数参数', props)
  useImperativeHandle(ref, () => ({
    showModal
  }))
  //帖子详情弹窗是否显示
  const [isModalOpen, setIsModalOpen] = useState(false)
  //当前帖子信息
  //   const [curComment, setCurComment] = useState<any>()
  //显示弹窗操作
  const showModal = (comment: any) => {
    console.log('打印view的comment', comment)
    // setCurComment(comment)
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
      <div className="comment">{/* <img className='comment_avatar' src="" alt="" /> */}</div>
    </Modal>
  )
}
export default React.forwardRef(CommentView)
