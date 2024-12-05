import { Space, Table, Popconfirm, Select, Input, message, Button } from 'antd'
import type { TableProps } from 'antd'
import { getPostService, delPostService, updatePostService } from '../../../api/post'
import { getPostCateService } from '../../../api/cate'
import { useState, useEffect, useRef } from 'react'
import PostDetail from '../../../components/postDetail'
const PostTable = () => {
  const postColumns: TableProps<any>['columns'] = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '贴文摘要',
      dataIndex: 'preContent',
      key: 'preContent'
    },
    {
      title: '发布时间',
      dataIndex: 'pub_time',
      key: 'pub_time'
    },
    {
      title: '头像',
      key: 'status',
      render: (row) => {
        return (
          <Space size="middle">
            <img
              style={{ width: '35px', height: '35px', overflow: 'hidden', borderRadius: '50%' }}
              src={row.avatar}
              alt=""
            />
          </Space>
        )
      }
    },
    {
      title: '作者',
      dataIndex: 'nick_name',
      key: 'nick_name'
    },
    {
      title: '评论数',
      dataIndex: 'comment_num',
      key: 'comment_num'
    },

    {
      title: '状态',
      key: 'status',
      render: (row) => {
        let color = row.status === '未通过' ? 'red' : 'greenyellow'
        return (
          <Space size="middle">
            <a style={{ color: color }}>{row.status}</a>
          </Space>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (row) => {
        let text = row.status === '未通过' ? 'pass' : 'unpass'
        return (
          <Space size="middle">
            <a onClick={() => showSonComp(row)}>view</a>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => removeItem(row)}
            >
              <a>Delete</a>
            </Popconfirm>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => passPost(row)}
            >
              <a>{text}</a>
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
  //请求帖子的参数
  const [reqQuery, setReqQuery] = useState<any>({
    pagenum: 1
  })
  //帖子列表
  const [postArr, setPostArr] = useState<Array<any>>([])
  //删除帖子操作
  const removeItem = async (e: any) => {
    await delPostService({ id: e.id })
    setReqQuery({ ...reqQuery })
  }
  //修过帖子审核状态
  const passPost = async (e: any) => {
    console.log('打印要通过审核的帖子', e)
    let newStatus = e.status === '通过' ? '未通过' : '通过'
    await updatePostService({ status: newStatus, id: e.id })
    setReqQuery({ ...reqQuery })
    message.success('修改审核状态成功')
  }
  //修改页数并获取数据
  const handlePageChange = (p: any) => {
    console.log('打印p', p)
    setReqQuery({ ...reqQuery, pagenum: p })
    setCurrentPage(p)
  }
  //获取分类
  useEffect(() => {
    const getCate = async () => {
      let res = await getPostCateService({ pagenum: 1 })
      console.log('获取cate', res.data.data)
    }
    getCate()
  }, [])
  //获取贴文数据
  useEffect(() => {
    //获取帖子列表
    const getPostList = async () => {
      let res = await getPostService(reqQuery)
      res.data.data.forEach((item: any) => {
        item.key = item.id
        item.preContent = item.content.slice(0, 8) + '...'
      })
      console.log('帖子数量', res.data.data)
      setPostArr(res.data.data)
    }
    getPostList()
  }, [reqQuery])
  //子组件dom
  const childRef: any = useRef(null)
  //操作子组件方法
  const showSonComp = (post: any) => {
    childRef.current.showModal(post)
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
