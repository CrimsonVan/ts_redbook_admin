import { Space, Table, Popconfirm, Input, Button } from 'antd'
import type { TableProps } from 'antd'
import { getPostService, updatePostService } from '../../../api/post'
import { useState, useEffect, useRef } from 'react'
import PostDetail from '../../../components/postDetail'

const PostPass = () => {
  console.log('测试多次渲染')
  //筛选参数对象
  const [formData, setFormData] = useState({})
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
        let text = row.status === '未通过' ? '通过' : '驳回'
        return (
          <Space size="middle">
            <a onClick={() => showSonComp(row)}>查看</a>
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
  //table分页所需参数
  const paginationProps = {
    pageSize: 8, // 每页数据条数
    total: 99, // 总条数
    onChange: (page: any) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false
  }
  //请求帖子的参数
  const [reqQuery, setReqQuery] = useState<any>({
    pagenum: 1,
    status: '未通过'
  })
  //帖子列表
  const [postArr, setPostArr] = useState<Array<any>>([])
  //修过帖子审核状态
  const passPost = async (e: any) => {
    console.log('打印要通过审核的帖子', e)
    let newStatus = e.status === '通过' ? '未通过' : '通过'
    let res = await updatePostService({ status: newStatus, id: e.id })
    if (res.data.message === '更新帖子状态成功') {
      setReqQuery({ ...reqQuery })
    }
  }
  //修改页数并获取数据
  const handlePageChange = (p: any) => {
    console.log('打印p', p)
    setReqQuery({ ...reqQuery, pagenum: p })
  }
  //获取贴文数据
  useEffect(() => {
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
    console.log('pagenum改变触发useEffect')
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

export default PostPass
