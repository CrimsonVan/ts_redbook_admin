import TestHome from '../pages/TestHome/testhome'
import Layout from '../pages/Layout/layout'
import Home from '../pages/Layout/Home/home'
import Test from '../pages/Layout/Test/test'
import Movie from '../pages/Movie/movie'
import Todolist from '../pages/Todolist/todolist'
import { createHashRouter } from 'react-router-dom'
export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/test', element: <Test /> }
    ]
  },
  { path: '/testhome', element: <TestHome /> },
  { path: '/movie', element: <Movie /> },
  { path: '/todolist', element: <Todolist /> }
])
