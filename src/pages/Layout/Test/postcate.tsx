import { Space, Table, Popconfirm, Input, Button } from 'antd'
import type { TableProps } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { getPostCateService } from '../../../api/cate'
import CateEditAdd from '../../../components/CateEditAdd'

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
  //筛选参数对象
  const [formData, setFormData] = useState({})
  //当前页数
  const [currentPage, setCurrentPage] = useState(1)
  //table分页所需参数
  const paginationProps = {
    pageSize: 8, // 每页数据条数
    total: 99, // 总条数
    current: currentPage,
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
    setCurrentPage(p)
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
  //点击查询操作
  const finish = () => {
    console.log('打印formData', formData)
    setReqQuery({
      ...reqQuery,
      ...formData,
      pagenum: 1
    })
  }
  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          分类名称
        </span>
        <Input
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              setFormData({ ...formData, cate_name: undefined })
              return
            }
            setFormData({ ...formData, cate_name: e.target.value.trim() })
          }}
          size="small"
        />
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          创建者
        </span>
        <Input
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              setFormData({ ...formData, creater: undefined })
              return
            }
            setFormData({ ...formData, creater: e.target.value.trim() })
          }}
          size="small"
        />
        <Button onClick={finish} size="small" type="primary">
          查询
        </Button>
      </Space>
      <div style={{ marginLeft: '10px', marginBottom: 10 }}>
        <Button onClick={() => showSonComp({ type: '新增' })} type="primary">
          添加+
        </Button>
      </div>
      <Table<any> columns={postColumns} dataSource={cates} pagination={paginationProps} />
      <CateEditAdd
        ref={childRef}
        getCateList={setReqQuery}
        reqQuery={reqQuery}
        changePage={setCurrentPage}
      ></CateEditAdd>
    </>
  )
}

export default PostCate
