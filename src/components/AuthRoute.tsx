import { getPersistToken } from '../utils/token'
import { Navigate } from 'react-router-dom'
function AuthRoute({ children }: any) {
  const token = getPersistToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace></Navigate>
  }
}

export default AuthRoute
