import TestHome from '../pages/TestHome/testhome'
import Layout from '../pages/Layout/layout'
import Home from '../pages/Layout/Home/home'
import Test from '../pages/Layout/Test/test'
import Movie from '../pages/Movie/movie'
import Todolist from '../pages/Todolist/todolist'
import Login from '../pages/Login/login'
import Users from '../pages/Layout/Users/Users'
import PostPass from '../pages/Layout/Test/postpass'
import PostCate from '../pages/Layout/Test/postcate'
import Message from '../pages/Layout/Message/message'
import { createHashRouter } from 'react-router-dom'
import AuthRoute from '../components/AuthRoute'
export const router = createHashRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/test', element: <Test /> },
      { path: '/users', element: <Users /> },
      { path: '/postpass', element: <PostPass /> },
      { path: '/postcate', element: <PostCate /> },
      { path: '/message', element: <Message /> }
    ]
  },
  { path: '/testhome', element: <TestHome /> },
  { path: '/login', element: <Login /> },
  { path: '/movie', element: <Movie /> },
  { path: '/todolist', element: <Todolist /> }
])
