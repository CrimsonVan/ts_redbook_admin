import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearToken, clearUserInfo } from '../../store/modules/todollist'
import { getPersistToken } from '../../utils/token'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme, Button, Popconfirm } from 'antd'
import './layout.scss'
const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('首页', '/', <PieChartOutlined />),
  getItem('文章列表', '3', <DesktopOutlined />),
  getItem('帖文管理', 'sub1', <UserOutlined />, [
    getItem('贴文审核', '/test'),
    getItem('Bill', '4'),
    getItem('Alex', '5')
  ]),
  getItem('用户管理', 'sub2', <TeamOutlined />, [
    getItem('信息审核', '/users'),
    getItem('Team 2', '8')
  ]),
  getItem('Files', '9', <FileOutlined />)
]

const LayoutPage: React.FC = () => {
  console.log('打印持久化token', getPersistToken())
  const [breadList, setBreadList] = useState<Array<any>>([
    {
      href: '',
      title: <HomeOutlined />
    }
  ])
  const dispatch = useDispatch()
  // 查询state中的数据
  const userInfo = useSelector((state: any) => state.todoStore.userInfo)
  const [collapsed, setCollapsed] = useState<boolean>(false) //是否折叠导航菜单
  const navigate = useNavigate() //路由跳转
  const location = useLocation() //获取当前路由
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const onClick = (e: any) => {
    const getBreadArr = (arr: any) => {
      let newArr = []
      const findNav: any = items.find((i: any) => i.key === arr[0])
      newArr.push({
        title: findNav.label
      })
      if (arr[1]) {
        const findNav2 = findNav.children.find((i: any) => i.key === arr[1])
        newArr.push({
          title: findNav2.label
        })
      }
      console.log('打印newArr', newArr)
      setBreadList([
        {
          href: '',
          title: <HomeOutlined />
        },

        ...newArr
      ])
    }
    getBreadArr(e.keyPath.reverse())
    navigate(e.key)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">小红书</div>
        <Menu
          onClick={onClick}
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="header">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <span className="username">{userInfo.nick_name}</span>
            <img className="avatar" src={userInfo.avatar} alt="" />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                navigate('/login')
                console.log('退出')
                dispatch(clearToken())
                dispatch(clearUserInfo())
              }}
            >
              <span className="logout">
                <LogoutOutlined />
                <span className="text">退出</span>
              </span>
            </Popconfirm>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadList}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 400,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
