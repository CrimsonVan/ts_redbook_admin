import './layout.scss'
import { Link, Outlet } from 'react-router-dom'
import { Button } from 'antd'
function Layout() {
  // console.log(a)
  return (
    <div className="layout">
      <div> this is layout</div>
      <div>
        <Button type="primary">TestUi</Button>
      </div>
      <Link to="/">去home</Link>
      <Link to="/test">去test</Link>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout
