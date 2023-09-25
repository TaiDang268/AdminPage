import { Navigate, Outlet } from 'react-router-dom'

function PrivateRouter(props: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (isLoggedIn === 'true') {
    return props.children || <Outlet />
  }

  return <Navigate to='/login' replace />
}
export default PrivateRouter
