import { Modal } from 'antd'
import { useState } from 'react'
import React, { useImperativeHandle } from 'react'
import { Input, message } from 'antd'
import { useSelector } from 'react-redux'
import { addPostCateService, updatePostCateService } from '../api/cate'

const CateEditAdd = ({ getCateList, reqQuery, changePage }: any, ref: any) => {
  // console.log('打印父传子的传参', props)
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
  // 查询state中的数据
  const userInfo = useSelector((state: any) => state.todoStore.userInfo)
  // 新增或更新贴文分类
  const addEditCate = async (obj: { type: any; inpVal: any; cate_id?: any }) => {
    if (obj.type === '新增') {
      await addPostCateService({
        cate_name: obj.inpVal,
        creater: userInfo.nick_name,
        creater_username: userInfo.username,
        creater_avatar: userInfo.avatar
      })
      setInpVal('')
      setIsModalOpen(false)
      getCateList({ ...reqQuery, pagenum: 1 })
      changePage(1)
      message.success('新增分类成功')
    } else if (obj.type === '编辑') {
      await updatePostCateService({ cate_id: obj.cate_id, cate_name: obj.inpVal })
      setInpVal('')
      setIsModalOpen(false)
      getCateList({ ...reqQuery })
      message.success('编辑分类成功')
    }
  }
  //点击确认
  const handleOk = () => {
    if (typeText === '新增') {
      addEditCate({ type: typeText, inpVal })
    } else if (typeText === '编辑') {
      addEditCate({ type: typeText, inpVal, cate_id: editId })
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
