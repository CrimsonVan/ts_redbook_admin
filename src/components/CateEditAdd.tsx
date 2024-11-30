import { Modal } from 'antd'
import { useState } from 'react'
import React, { useImperativeHandle } from 'react'
import { Input } from 'antd'
const CateEditAdd = ({ addEditCate }: any, ref: any) => {
  //   console.log('打印父传子的传参', props)
  useImperativeHandle(ref, () => ({
    showModal
  }))
  //帖子详情弹窗是否显示
  const [isModalOpen, setIsModalOpen] = useState(false)
  //组件类型
  const [typeText, setTypeText] = useState('编辑')
  //输入框内容
  const [inpVal, setInpVal] = useState('')
  //所编辑的分类id
  const [editId, setEditId] = useState(0)
  //显示弹窗操作
  const showModal = (obj: { type: any; cate_id?: any; cate_name?: any }) => {
    setIsModalOpen(true)
    setTypeText(obj.type)
    if (obj.type === '新增') {
      console.log('cate is existed', obj)
    } else if (obj.type === '编辑') {
      console.log('cate is not existed', obj)
      setInpVal(obj.cate_name)
      setEditId(obj.cate_id)
    }
  }
  //修改贴文状态为通过
  const handleOk = () => {
    if (typeText === '新增') {
      addEditCate({ type: typeText, inpVal })
    } else if (typeText === '编辑') {
      addEditCate({ type: typeText, inpVal, cate_id: editId })
      //   console.log('打印编辑传参', inpVal, editId)
    }
  }
  //修改贴文状态为未通过
  const handleCancel = () => {
    console.log('cancel')
    setInpVal('')

    setIsModalOpen(false)
  }
  return (
    <Modal
      width={400}
      okText="完成"
      cancelText="关闭"
      title={typeText}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={true}
    >
      <Input value={inpVal} showCount maxLength={20} onChange={(e) => setInpVal(e.target.value)} />
    </Modal>
  )
}
export default React.forwardRef(CateEditAdd)
