import { Space, Table, Select, Input, Button } from 'antd'
import { useRef } from 'react'
import PostDetail from '../../../components/postDetail'
import { useData } from './hooks/processData'
const PostTable = () => {
  //详情弹窗组件的dom
  const childRef: any = useRef(null)
  //表格数据的hooks
  const { postArr, passPost, postColumns, paginationProps, finish, formData, setFormData } =
    useData({ dom: childRef })

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          审核状态
        </span>
        <Select
          style={{ width: 120 }}
          onChange={(val) => setFormData({ ...formData, status: val })}
          size="small"
          allowClear={true}
          options={[
            { value: '未通过', label: '未通过' },
            { value: '通过', label: '通过' }
          ]}
        />
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          作者
        </span>
        <Input
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              setFormData({ ...formData, nick_name: undefined })
              return
            }
            setFormData({ ...formData, nick_name: e.target.value.trim() })
          }}
          size="small"
        />
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          标题
        </span>
        <Input
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              setFormData({ ...formData, title: undefined })
              return
            }
            setFormData({ ...formData, title: e.target.value.trim() })
          }}
          size="small"
        />
        <Button onClick={finish} size="small" type="primary">
          查询
        </Button>
      </Space>
      <Table<any> columns={postColumns} dataSource={postArr} pagination={paginationProps} />
      <PostDetail ref={childRef} updateStatus={passPost}></PostDetail>
    </>
  )
}

export default PostTable
