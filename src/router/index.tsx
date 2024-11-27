import Home from '../pages/Home/home'
import Movie from '../pages/Movie/movie'
import Todolist from '../pages/Todolist/todolist'
import { createBrowserRouter } from 'react-router-dom'
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/movie', element: <Movie /> },
  { path: '/todolist', element: <Todolist /> }
])
