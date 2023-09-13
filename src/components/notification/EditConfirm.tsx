import axios from 'axios'
import { GrClose } from 'react-icons/gr'
import { ToastContainer } from 'react-toastify'

import { getByParams } from '~/api'
import { setDataPost } from '~/redux/features/PostsSlice'
import { useAppDispatch } from '~/redux/hooks'

import { updateSuccessMess } from '../toast-message'

interface IEditConfirm {
  isShow?: boolean
  isClose: () => void
  itemAfterEdit: any
  isCheckConfirm: () => void
}
const EditConfirm = (props: IEditConfirm) => {
  const { isShow, isClose, itemAfterEdit, isCheckConfirm } = props
  const dispatch = useAppDispatch()
  const handleClickConfirm = async () => {
    isCheckConfirm()
    const data = {
      author: itemAfterEdit.author,
      name: itemAfterEdit.name,
      short_desc: itemAfterEdit.short_desc,
      category: itemAfterEdit.category,
      date: itemAfterEdit.date
    }
    try {
      await axios
        .patch(`http://localhost:3007/posts/${itemAfterEdit.id}`, data)
        .then(() => {
          const fetchDataAsync = async () => {
            try {
              const res = await getByParams('posts', { _limit: 10 })
              dispatch(setDataPost(res))
            } catch (error) {
              console.error('Lỗi khi lấy dữ liệu:', error)
            }
          }
          fetchDataAsync()
        })
        .catch((error) => {
          console.log(error)
        })
      updateSuccessMess()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {isShow && (
        <>
          <div className='w-screen h-screen z-50 bg-[#2f2c2c] opacity-60 '></div>

          <div
            className='w-[800px] h-[400px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 
       border border-gray-500 bg-white rounded-lg px-4 '
          >
            <p className='font-bold text-[24px] my-4'>Xác nhận sửa bài viết</p>
            <div className='grid grid-cols-[150px,auto]  gap-4'>
              <div className=' my-auto font-medium  '>Id</div>
              <p>{itemAfterEdit.id}</p>
              <div className=' my-auto font-medium  '>Tên bài viết</div>
              <p>{itemAfterEdit.name}</p>
              <div className=' my-auto font-medium'>Mô tả</div>
              <p>{itemAfterEdit.short_desc}</p>

              <div className=' my-auto font-medium'>Tác giả</div>
              <p>{itemAfterEdit.author}</p>

              <div className=' my-auto font-medium'>Chủ đề</div>
              <p>{itemAfterEdit.category}</p>

              <div className=' my-auto font-medium'>Ngày đăng bài</div>
              <p>{itemAfterEdit.date}</p>
            </div>

            <button className='fixed right-5 top-5' onClick={isClose}>
              <GrClose />
            </button>
            <div className='fixed right-5 bottom-5'>
              <button className='rounded border  px-3 py-1 font-medium' onClick={isClose}>
                Thoát
              </button>
              <button className='text-white bg-[#186E25]  rounded px-3 py-1 ml-4' onClick={handleClickConfirm}>
                Xác nhận
              </button>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  )
}
export default EditConfirm
