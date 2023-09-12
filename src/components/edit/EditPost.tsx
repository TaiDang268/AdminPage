import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GrClose } from 'react-icons/gr'

import { IPosts } from '~/types/interfaces'

import EditConfirm from '../notification/EditConfirm'
interface IEditPosts {
  isShow?: boolean
  isClose?: () => void
  itemEdit: IPosts | null
  isCheckConfirm: () => void
}
const EditPosts = (props: IEditPosts) => {
  const { isShow, isClose, itemEdit, isCheckConfirm } = props
  const { register, getValues } = useForm()
  const allInput = getValues()
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
  const handleOnClickUpdate = () => {
    setIsShowConfirm(true)
  }
  return (
    <>
      {isShow && (
        <>
          <div className='w-screen h-screen z-40 bg-[#2f2c2c] opacity-60 '></div>

          <div
            className='w-[800px] h-[400px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 
       border border-gray-500 bg-white rounded-lg px-4 '
          >
            <p className='font-bold text-[24px] my-4'> Sửa bài viết</p>
            <div className='grid grid-cols-[150px,auto]  gap-4'>
              <div className=' my-auto font-medium  '>Id</div>
              <input className='bg-gray-400 h-[32px]' value={itemEdit?.id} {...register('id')} />
              <div className=' my-auto font-medium  '>Tên bài viết</div>
              <input className='h-[32px]' defaultValue={itemEdit?.name} {...register('name')} />
              <div className=' my-auto font-medium'>Mô tả</div>
              <input className='h-[32px]' defaultValue={itemEdit?.short_desc} {...register('short_desc')} />
              <div className=' my-auto font-medium'>Tác giả</div>
              <input className='h-[32px]' defaultValue={itemEdit?.author} {...register('author')} />
              <div className=' my-auto font-medium'>Chủ đề</div>
              <input className='h-[32px]' defaultValue={itemEdit?.category} {...register('category')} />
              <div className=' my-auto font-medium'>Ngày đăng bài</div>
              <input className='h-[32px]' defaultValue={itemEdit?.date} {...register('date')} />
            </div>

            <button className='fixed right-5 top-5' onClick={isClose}>
              <GrClose />
            </button>
            <div className='fixed right-5 bottom-5'>
              <button className='rounded border  px-3 py-1 font-medium' onClick={isClose}>
                Thoát
              </button>
              <button className='text-white bg-[#186E25]  rounded px-3 py-1 ml-4' onClick={handleOnClickUpdate}>
                Cập nhật
              </button>
            </div>
          </div>
          <EditConfirm
            isShow={isShowConfirm}
            isClose={() => setIsShowConfirm(false)}
            itemAfterEdit={allInput}
            isCheckConfirm={isCheckConfirm}
          />
        </>
      )}
    </>
  )
}
export default EditPosts
