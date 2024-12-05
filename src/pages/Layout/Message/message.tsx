import { Space, Table, Popconfirm, Input, Button } from 'antd'
import type { TableProps } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { getCommentsService } from '../../../api/comments'
import CommentView from '../../../components/CommentView'

const Message = () => {
  const postColumns: TableProps<any>['columns'] = [
    {
      title: '编号',
      dataIndex: 'comment_id',
      key: 'comment_id'
    },
    {
      title: '评论人',
      dataIndex: 'nick_name',
      key: 'nick_name'
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
      title: '被评论人',
      dataIndex: 'reply_nickname',
      key: 'reply_nickname'
    },

    {
      title: '回复帖子编号',
      dataIndex: 'post_id',
      key: 'post_id'
    },
    {
      title: '内容',
      dataIndex: 'preContent',
      key: 'preContent'
    },

    {
      title: '操作',
      key: 'action',
      render: (row: any) => {
        return (
          <Space size="middle">
            <a onClick={() => showSonComp(row)}>查看</a>
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
  const [comments, setComments] = useState<Array<any>>([])
  //修改页数并获取数据
  const handlePageChange = (p: any) => {
    console.log('打印p', p)
    setReqQuery({ ...reqQuery, pagenum: p })
    setCurrentPage(p)
  }
  //获取分类列表数据
  useEffect(() => {
    const getCateList = async () => {
      let res = await getCommentsService(reqQuery)
      res.data.data.forEach((item: any) => {
        item.key = item.comment_id
        if (item.content.length >= 5) {
          item.preContent = item.content.slice(0, 5) + '...'
        } else {
          item.preContent = item.content
        }
        if (item.reply_nickname === '0') {
          item.reply_nickname = item.post_nickname
        }
      })
      console.log('评论列表数量', res.data.data)
      setComments(res.data.data)
    }
    getCateList()
  }, [reqQuery])

  //子组件dom
  const childRef: any = useRef(null)
  //操作子组件方法
  const showSonComp = (row: any) => {
    childRef.current.showModal(row)
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
      <Space style={{ marginBottom: 15 }}>
        <span
          style={{ marginRight: '5px', marginLeft: '10px', fontWeight: '600', color: '#6e6e6e' }}
        >
          发布者
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
          被评论人
        </span>
        <Input
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              setFormData({ ...formData, reply_nickname: undefined })
              return
            }
            setFormData({ ...formData, reply_nickname: e.target.value.trim() })
          }}
          size="small"
        />

        <Button onClick={finish} size="small" type="primary">
          查询
        </Button>
      </Space>
      <Table<any> columns={postColumns} dataSource={comments} pagination={paginationProps} />
      <CommentView ref={childRef}></CommentView>
    </>
  )
}

export default Message
