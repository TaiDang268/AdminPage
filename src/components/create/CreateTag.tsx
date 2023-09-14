import { useForm } from 'react-hook-form'
import { MdArrowBackIos } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { addTag, updateTag } from '~/redux/features/TagSlice'
import { useAppDispatch } from '~/redux/hooks'
import { ITag } from '~/types/interfaces'

import { addSuccessMess, updateSuccessMess } from '../toast-message'

const CreateTag = () => {
  const { register, getValues } = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const tagItem = location.state
  const handleClickButton = () => {
    if (!tagItem) {
      const dataAdd: Omit<ITag, 'id'> = {
        name: getValues('tag_name')
      }
      dispatch(addTag(dataAdd))
      addSuccessMess('tag')
    } else {
      const dataEdit: ITag = {
        id: tagItem.id,
        name: getValues('tag_name')
      }
      dispatch(updateTag(dataEdit))
      updateSuccessMess('tag')
    }
  }
  return (
    <>
      <div className='w-full bg-[#F0F6FF] h-screen p-4'>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
            <div className='cursor-pointer' onClick={() => navigate(-1)}>
              <MdArrowBackIos />
            </div>
            <p className='text-[24px] font-semibold'>{tagItem?.id ? 'Cập nhật tag' : 'Tag mới'}</p>
          </div>
          <div>
            <button className='text-white bg-primary px-3 rounded h-[32px]' onClick={handleClickButton}>
              {tagItem?.id ? 'Cập nhật ' : 'Lưu'}
            </button>
          </div>
        </div>
        <div className='w-full bg-white  my-5 p-3 border border-[#E3E5E8] rounded'>
          <div className='flex'>
            <p>Tên tag</p>
            <p className='text-red-600'>*</p>
          </div>
          <input className='w-full h-[32px] mt-2' {...register('tag_name')} defaultValue={tagItem?.name} />
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default CreateTag
