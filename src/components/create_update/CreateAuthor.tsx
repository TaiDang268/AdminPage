import { useForm } from 'react-hook-form'
import { MdArrowBackIos } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useAddAuthorMutation, useEditAuthorMutation } from '~/rtk-query/author.service'
import { IAuthor } from '~/types/interfaces'

import { addSuccessMess, updateSuccessMess } from '../toast-message'

const CreateAuthor = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const authorItem = location.state
  const { register, getValues } = useForm()
  const [addAuthor] = useAddAuthorMutation()
  const [updateAuthor] = useEditAuthorMutation()
  const handleClickButton = () => {
    if (!authorItem) {
      const dataAdd: Omit<IAuthor, 'id'> = {
        name: getValues('author_name')
      }
      addAuthor(dataAdd)
      addSuccessMess('tác giả')
    } else {
      const dataEdit: IAuthor = {
        id: authorItem.id,
        name: getValues('author_name')
      }
      updateAuthor(dataEdit)
      updateSuccessMess('tác giả')
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
            <p className='text-[24px] font-semibold'>{authorItem?.id ? 'Cập nhật tác giả' : 'Tác giả mới'}</p>
          </div>
          <div>
            <button className='text-white bg-primary px-3 rounded h-[32px]' onClick={handleClickButton}>
              {authorItem?.id ? 'Cập nhật ' : 'Lưu'}
            </button>
          </div>
        </div>
        <div className='w-full bg-white  my-5 p-3 border border-[#E3E5E8] rounded'>
          <div className='flex'>
            <p>Tên tác giả</p>
            <p className='text-red-600'>*</p>
          </div>
          <input className='w-full h-[32px] mt-2' defaultValue={authorItem?.name} {...register('author_name')} />
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default CreateAuthor
