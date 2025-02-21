import { useEffect, useState } from 'react'
import { allUserGetService } from '../../../api/user'
import { Space, Table, Popconfirm, Input, Button } from 'antd'
import type { TableProps } from 'antd'

const Users = () => {
  const usersColumns: TableProps<any>['columns'] = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '昵称',
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
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '粉丝数',
      dataIndex: 'followed_count',
      key: 'followed_count'
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday'
    },

    {
      title: '签名',
      dataIndex: 'signature',
      key: 'signature'
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: '操作',
      key: 'action',
      render: (row) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => console.log('Delete', row)}
            >
              <a>Delete</a>
            </Popconfirm>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => console.log('edit', row)}
            >
              <a>edit</a>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  //筛选参数对象
  const [formData, setFormData] = useState({})
  //table分页所需参数
  const paginationProps = {
    pageSize: 8, // 每页数据条数
    total: 99, // 总条数
    onChange: (page: any) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false
  }
  //请求用户列表的参数
  const [reqQuery, setReqQuery] = useState<any>({
    pagenum: 1
  })
  //修改页数并获取数据
  const handlePageChange = (p: any) => {
    setReqQuery({ ...reqQuery, pagenum: p })
  }
  //用户列表
  const [users, setUsers] = useState<Array<any>>()
  //获取用户列表
  useEffect(() => {
    const getUsers = async () => {
      let res = await allUserGetService(reqQuery)
      console.log('打印所有用户', res.data.data)
      res.data.data.forEach((item: any) => {
        item.key = item.id
      })
      setUsers(res.data.data)
    }
    getUsers()
  }, [reqQuery])

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
          昵称
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
          用户名
        </span>
        <Input
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              setFormData({ ...formData, username: undefined })
              return
            }
            setFormData({ ...formData, username: e.target.value.trim() })
          }}
          size="small"
        />
        <Button onClick={finish} size="small" type="primary">
          查询
        </Button>
      </Space>
      <Table<any> columns={usersColumns} dataSource={users} pagination={paginationProps} />
    </>
  )
}
export default Users
