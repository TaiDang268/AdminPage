import clsx from 'clsx'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import images from '~/assets/images'
const arr = [
  {
    id: 1,
    title: 'Bài viết',
    value: 'news'
  },
  {
    id: 1,
    title: 'Chủ đề',
    value: 'topic'
  },
  {
    id: 1,
    title: 'Tác giả',
    value: 'author'
  },
  {
    id: 1,
    title: 'Tag',
    value: 'tag'
  }
]
const SideBar = () => {
  const [active, setActive] = useState<string>('')
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const handleOnclickSidebar = (sidebarItem: string) => {
    if (sidebarItem === 'write') {
      setShowSidebar(!showSidebar)
    }
    setActive(sidebarItem)
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
              <p
                key={item.id}
                className={clsx(
                  ' cursor-pointer w-full rounded h-[40px]  pl-12 flex items-center ',
                  active === item.value ? 'bg-[#3F4D63]' : null
                )}
                onClick={() => handleOnclickSidebar(item.value)}
              >
                {item.title}
              </p>
            ))}
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center  w-full rounded h-[40px] my-3 pl-3 ',
              active === 'image' ? 'bg-[#3F4D63]' : null
            )}
            onClick={() => handleOnclickSidebar('image')}
          >
            <img src={images.Image} />
            <p className='m-3'>Ảnh</p>
          </div>

          <div
            className={clsx(
              'flex cursor-pointer items-center  w-full rounded h-[40px] my-3 pl-3 ',
              active === 'setting' ? 'bg-[#3F4D63]' : null
            )}
            onClick={() => handleOnclickSidebar('setting')}
          >
            <img src={images.Setting} />
            <p className='m-3'>Cài đặt</p>
          </div>
        </div>
        {/* bottom */}
        <div className='absolute bottom-4  w-full px-3'>
          <div className='flex my-3'>
            <div className='mr-3'>
              <img src={images.Avatar} className='w-[40px] h-[40px] rounded-[50%]' />
            </div>
            <div>
              <p className='font-bold '>TuyenPhan</p>
              <p className='text-[#939393]'>Admin</p>
            </div>
          </div>
          <div>
            <div className=' bg-[#3F4D63] w-full rounded h-[40px] cursor-pointer flex items-center  '>
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
