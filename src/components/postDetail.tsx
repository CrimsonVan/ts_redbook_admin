import { Modal, Image } from 'antd'
import { useState } from 'react'
import React, { useImperativeHandle } from 'react'
import './postDetail.scss'
const PostDetail = ({ updateStatus }: any, ref: any) => {
  //   console.log('打印父传子的函数参数',updateStatus.length)
  useImperativeHandle(ref, () => ({
    showModal
  }))
  //帖子详情弹窗是否显示
  const [isModalOpen, setIsModalOpen] = useState(false)
  //当前帖子信息
  const [curPost, setCurPost] = useState<any>()
  //显示弹窗操作
  const showModal = (post: any) => {
    setCurPost(post)
    setIsModalOpen(true)
  }
  //修改贴文状态为通过
  const handleOk = () => {
    updateStatus(curPost)
    setIsModalOpen(false)
  }
  //修改贴文状态为未通过
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      width={500}
      okText={curPost?.status === '通过' ? '不通过' : '通过'}
      cancelText="关闭"
      title="帖文"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <div className="post_detail">
        <div className="header">
          <img className="header_avatar" src={curPost?.avatar}></img>
          <div className="header_text">
            <div className="header_name">{curPost?.nick_name}</div>
            <div className="header_pubtime">{curPost?.pub_time}</div>
          </div>
          <div
            style={{ color: curPost?.status === '通过' ? 'greenyellow' : 'red' }}
            className="header_status"
          >
            {curPost?.status === '通过' ? '通过' : '未通过'}
          </div>
        </div>
        <div className="title">{curPost?.title}</div>
        <div className="content">{curPost?.content}</div>
        <div className="imgs">
          {curPost?.content_img.split(',').map((item: any, index: any) => (
            <div key={index} className="img">
              <Image width={120} height={120} src={item} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default React.forwardRef(PostDetail)
