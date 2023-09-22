import { Navigate, Outlet } from 'react-router-dom'

function PublicRouter(props: { children?: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (isLoggedIn === 'true') {
    return <Navigate to='/' />
  }
  return props.children || <Outlet />
}
export default PublicRouter
