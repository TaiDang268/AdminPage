import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import images from '~/assets/images'
import routesPath from '~/routes/routesPath'
const arr = [
  {
    id: 1,
    title: 'Bài viết',
    path: routesPath.posts
  },
  {
    id: 2,
    title: 'Chủ đề',
    path: routesPath.topic
  },
  {
    id: 3,
    title: 'Tác giả',
    path: routesPath.author
  },
  {
    id: 4,
    title: 'Tag',
    path: routesPath.tag
  }
]
const SideBar = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState<string>('')
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const location = useLocation()
  const currentPath = location.pathname

  let userObject
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    userObject = JSON.parse(storedUser)
  } else {
    console.log('Không tìm thấy thông tin người dùng trong localStorage')
  }
  const handleOnclickSidebar = (sidebarItem: string) => {
    if (sidebarItem === 'write') {
      setShowSidebar(!showSidebar)
    }
  }
  const handleOnclickItemChildren = (itemChildren: string) => {
    setActive(itemChildren)
  }
  const handleClickLogOut = () => {
    navigate('/login')
    localStorage.setItem('isLoggedIn', 'false')
    Cookies.remove('accessToken')
  }
  return (
    <>
      <div className='w-[260px] h-screen bg-[#2A3444] relative text-white'>
        {/* top */}
        <div className='h-[124px] bg-[#186E25]  flex justify-center items-center '>
          <img src={images.LogoBattechSidebar} />
        </div>
        {/* between */}
        <div className='font-medium px-3 mt-8 '>
          <div
            className={clsx(
              'flex cursor-pointer items-center  w-full rounded h-[40px] my-3 pl-3 relative',
              active === 'write' ? 'bg-[#3F4D63]' : null
            )}
            onClick={() => handleOnclickSidebar('write')}
          >
            <img src={images.WriteNews} />
            <p className='m-3'>Viết bài</p>
            <div className='absolute right-3'>{showSidebar ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
          </div>
          <div className={clsx(showSidebar ? 'block' : 'hidden')}>
            {arr.map((item) => (
              <NavLink
                to={item.path}
                key={item.id}
                className={clsx(
                  ' cursor-pointer w-full rounded h-[40px]  pl-12 flex items-center ',
                  currentPath === item.path ? 'bg-[#3F4D63]' : null
                )}
                onClick={() => handleOnclickItemChildren(item.path)}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center  w-full rounded h-[40px] my-3 pl-3 ',
              active === 'image' ? 'bg-[#3F4D63]' : null
            )}
          >
            <img src={images.Image} />
            <p className='m-3'>Ảnh</p>
          </div>

          <div
            className={clsx(
              'flex cursor-pointer items-center  w-full rounded h-[40px] my-3 pl-3 ',
              active === 'setting' ? 'bg-[#3F4D63]' : null
            )}
          >
            <img src={images.Setting} />
            <p className='m-3'>Cài đặt</p>
          </div>
        </div>
        {/* bottom */}
        <div className='absolute bottom-4  w-full px-3'>
          <div className='flex my-3'>
            <div className='mr-3'>
              <img src={userObject.image} className='w-[40px] h-[40px] rounded-[50%]' />
            </div>
            <div>
              <p className='font-bold '>{userObject.name}</p>
              <p className='text-[#939393] '>{userObject.typeOf}</p>
            </div>
          </div>
          <div>
            <div
              className=' bg-[#3F4D63] w-full rounded h-[40px] cursor-pointer flex items-center'
              onClick={handleClickLogOut}
            >
              <img src={images.LogoutIcon} className='mx-4' />
              <p className=' font-normal'>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SideBar
