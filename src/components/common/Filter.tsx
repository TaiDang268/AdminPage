import { useState } from 'react'

import { searchByName, sortAZ, sortZA } from '~/api'
import { setDataPost } from '~/redux/features/PostsSlice'
import { useAppDispatch } from '~/redux/hooks'

import images from '../../assets/images'

const Filter = () => {
  const [valueInput, setValueInput] = useState<string>('')
  const [showOptionsSort, setShowOptionsSort] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('posts', valueInput)
      dispatch(setDataPost(res))
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnClickAZ = async () => {
    setShowOptionsSort(false)
    try {
      const res = await sortAZ('posts')
      dispatch(setDataPost(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleOnClickZA = async () => {
    setShowOptionsSort(false)
    try {
      const res = await sortZA('posts')
      dispatch(setDataPost(res))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='w-full mt-4'>
        <div className='flex justify-between'>
          <div className='flex'>
            <div
              className='border border-[#9D9D9D] rounded h-[32px] w-[32px] flex items-center justify-center mr-4 cursor-pointer'
              onClick={handleOnClickSearch}
            >
              <img src={images.Search} />
            </div>
            <div>
              <input
                placeholder='Tìm kiếm...'
                className='border border-[#9D9D9D] rounded h-[32px] px-1 mr-4'
                onChange={(event) => setValueInput(event.target.value)}
              />
            </div>
            <div className='border border-[#9D9D9D] rounded h-[32px] w-[84px] flex items-center justify-center cursor-pointer '>
              <img src={images.FilterOption} />
              <p>Bộ lọc </p>
            </div>
          </div>
          <div className='border border-[#9D9D9D] rounded h-[32px] w-[87px]  cursor-pointer relative'>
            <div
              className='flex items-center justify-center h-full'
              onClick={() => setShowOptionsSort(!showOptionsSort)}
            >
              <img src={images.Sort} />
              <p>Sắp xếp</p>
            </div>
            {showOptionsSort && (
              <div className='absolute mt-3'>
                <p
                  className=' flex items-center justify-center border border-[#9D9D9D] rounded h-[32px] w-[87px]  cursor-pointer bg-white hover:bg-gray-400'
                  onClick={handleOnClickAZ}
                >
                  A - Z
                </p>
                <p
                  className=' flex items-center justify-center border border-[#9D9D9D] rounded h-[32px] w-[87px]  cursor-pointer bg-white  hover:bg-gray-400'
                  onClick={handleOnClickZA}
                >
                  Z - A
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Filter
