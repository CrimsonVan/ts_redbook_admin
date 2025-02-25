import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { getPostService, delPostService, updatePostService } from '../../../../api/post'
import type { TableProps } from 'antd'
import { Space, Popconfirm, message } from 'antd'
import { useLocation } from 'react-router-dom'
export function useData({ dom }: any) {
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
      render: (row: any) => {
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
        let text = row.status === '未通过' ? '通过' : '不通过'
        return (
          <Space size="middle">
            <a onClick={() => showSonComp(row)}>查看</a>
            <Popconfirm
              title="Warning"
              description="确定要删除这个贴文吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => removeItem(row)}
            >
              <a>删除</a>
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
  const { state } = useLocation()
  useEffect(() => {
    console.log('location的state', state)
  }, [])
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
  //修改页数并获取数据
  const handlePageChange = (p: any) => {
    console.log('打印p', p)
    setReqQuery({ ...reqQuery, pagenum: p })
    setCurrentPage(p)
  }
  //请求帖子的参数
  const [reqQuery, setReqQuery] = useState<any>({
    pagenum: 1
  })
  //帖子列表
  const [postArr, setPostArr] = useState<Array<any>>([])
  //从服务端获取数据
  const { run: runGetPosts } = useRequest(() => getPostService(reqQuery), {
    manual: true,
    onSuccess: (res) => {
      res.data.data.forEach((item: any) => {
        item.key = item.id
        item.preContent = item.content.slice(0, 8) + '...'
      })
      setPostArr(res.data.data)
    }
  })
  //执行获取异步数据的操作
  useEffect(() => {
    runGetPosts()
  }, [reqQuery])
  //删除帖子操作
  const { run: removeItem } = useRequest(
    (e: any) => {
      return delPostService({ id: e.id })
    },
    {
      manual: true,
      onSuccess: () => {
        setReqQuery({ ...reqQuery })
        message.success('删除帖子成功')
      }
    }
  )
  //获取修改帖子审核状态
  const { run: passPost } = useRequest(
    (e: any) => {
      let newStatus = e.status === '通过' ? '未通过' : '通过'
      return updatePostService({ status: newStatus, id: e.id })
    },
    {
      manual: true,
      onSuccess: () => {
        setReqQuery({ ...reqQuery })
        message.success('修改审核状态成功')
      }
    }
  )
  //点击查询操作
  const finish = () => {
    setReqQuery({
      ...reqQuery,
      ...formData,
      pagenum: 1
    })
    setCurrentPage(1)
  }
  //操作子组件方法
  const showSonComp = (post: any) => {
    dom.current.showModal(post)
  }
  return {
    postArr,
    setPostArr,
    reqQuery,
    setReqQuery,
    runGetPosts,
    removeItem,
    postColumns,
    passPost,
    paginationProps,
    setCurrentPage,
    currentPage,
    finish,
    formData,
    setFormData
  }
}
