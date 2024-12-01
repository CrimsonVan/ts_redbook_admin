import { getPersistToken } from '../utils/token'
import { Navigate } from 'react-router-dom'
import { message } from 'antd'
function AuthRoute({ children }: any) {
  const token = getPersistToken()
  if (token) {
    return <>{children}</>
  } else {
    message.error('请先登录')
    return <Navigate to={'/login'} replace></Navigate>
  }
}

export default AuthRoute
