import { useLocation } from 'react-router-dom'

import SideBar from './SideBar'

interface IPropsMain {
  children?: React.ReactNode
}
const Layout = ({ children }: IPropsMain) => {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login'
  return (
    <div className='flex'>
      {!isLoginRoute && <SideBar />}
      <main className='w-full'>{children}</main>
    </div>
  )
}
export default Layout
