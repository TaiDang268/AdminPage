import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'

const Layout = () => {
  return (
    <div className='flex'>
      <SideBar />
      <main className='w-full'>
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
