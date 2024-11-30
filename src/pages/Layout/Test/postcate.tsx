import { Space, Table, Popconfirm, Input, Button } from 'antd'
import type { TableProps } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { getPostCateService, addPostCateService, updatePostCateService } from '../../../api/cate'
import CateEditAdd from '../../../components/cateEditAdd'
import { useSelector } from 'react-redux'
const { Search } = Input
const PostCate = () => {
  const postColumns: TableProps<any>['columns'] = [
    {
      title: '编号',
      dataIndex: 'cate_id',
      key: 'cate_id'
    },
    {
      title: '分类名称',
      dataIndex: 'cate_name',
      key: 'cate_name'
    },
    {
      title: '创建者',
      dataIndex: 'creater',
      key: 'creater'
    },
    {
      title: '头像',
      key: 'status',
      render: (row) => {
        return (
          <Space size="middle">
            <img
              style={{ width: '35px', height: '35px', overflow: 'hidden', borderRadius: '50%' }}
              src={row.creater_avatar}
              alt=""
            />
          </Space>
        )
      }
    },
    {
      title: '用户名',
      dataIndex: 'creater_username',
      key: 'creater_username'
    },
    {
      title: '使用次数',
      dataIndex: 'use_times',
      key: 'use_times'
    },

    {
      title: '操作',
      key: 'action',
      render: (row: any) => {
        return (
          <Space size="middle">
            <a
              onClick={() =>
                showSonComp({ type: '编辑', cate_id: row.cate_id, cate_name: row.cate_name })
              }
            >
              编辑
            </a>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  //table分页所需参数
  const paginationProps = {
    pageSize: 8, // 每页数据条数
    total: 99, // 总条数
    onChange: (page: any) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false
  }
  //请求分类列表的参数
  const [reqQuery, setReqQuery] = useState<any>({
    pagenum: 1
  })
  //分类列表
  const [cates, setCates] = useState<Array<any>>([])
  //修改页数并获取数据
  const handlePageChange = (p: any) => {
    console.log('打印p', p)
    setReqQuery({ ...reqQuery, pagenum: p })
  }
  //获取分类列表数据
  useEffect(() => {
    const getCateList = async () => {
      let res = await getPostCateService(reqQuery)
      res.data.data.forEach((item: any) => {
        item.key = item.cate_id
      })
      console.log('分类列表数量', res.data.data)
      setCates(res.data.data)
    }
    getCateList()
  }, [reqQuery])
  //子组件dom
  const childRef: any = useRef(null)
  //操作子组件方法
  const showSonComp = (obj: { type: any; cate_id?: any; cate_name?: any }) => {
    childRef.current.showModal(obj)
  }
  // 查询state中的数据
  const userInfo = useSelector((state: any) => state.todoStore.userInfo)
  // 新增/编辑 贴文分类
  const addEditCate = async (obj: { type: any; inpVal: any; cate_id?: any }) => {
    if (obj.type === '新增') {
      let res = await addPostCateService({
        cate_name: obj.inpVal,
        creater: userInfo.nick_name,
        creater_username: userInfo.username,
        creater_avatar: userInfo.avatar
      })
      if (res.data.message === '新增分类成功' || res.data.message === '编辑分类成功') {
        setReqQuery({ ...reqQuery })
      }
    } else if (obj.type === '编辑') {
      let res = await updatePostCateService({ cate_id: obj.cate_id, cate_name: obj.inpVal })
      if (res.data.message === '新增分类成功' || res.data.message === '编辑分类成功') {
        setReqQuery({ ...reqQuery })
      }
    }
  }
  //筛选用户名
  const onSearch: any = (type: string, value: any) => {
    console.log('search类型和值分别为', type, value)
    const query: any = {
      pagenum: reqQuery.pagenum
    }
    query[type] = value
    setReqQuery(query)
  }
  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          分类名称
        </span>
        <Search
          onSearch={(val: any) => onSearch('cate_name', val)}
          size="small"
          placeholder="input author name"
          enterButton
        />
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          创建者
        </span>
        <Search
          onSearch={(val: any) => onSearch('creater', val)}
          size="small"
          placeholder="input author name"
          enterButton
        />
      </Space>
      <div style={{ marginLeft: '10px', marginBottom: 10 }}>
        <Button onClick={() => showSonComp({ type: '新增' })} type="primary">
          添加+
        </Button>
      </div>
      <Table<any> columns={postColumns} dataSource={cates} pagination={paginationProps} />
      <CateEditAdd ref={childRef} addEditCate={addEditCate}></CateEditAdd>
    </>
  )
}

export default PostCate
