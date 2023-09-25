import { useForm } from 'react-hook-form'
import { MdArrowBackIos } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useAddTopicMutation, useEditTopicMutation } from '~/rtk-query/topic.service'
import { ITopic } from '~/types/interfaces'

import { addSuccessMess, updateSuccessMess } from '../toast-message'
const CreateTopic = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, getValues } = useForm()
  const topicItem = location.state
  const [addTopic] = useAddTopicMutation()
  const [editTopic] = useEditTopicMutation()
  const handleClickButton = () => {
    if (!topicItem) {
      const dataAdd: Omit<ITopic, 'id'> = {
        name: getValues('topic_name'),
        slug: getValues('topic_slug'),
        quantity: '10'
      }
      addTopic(dataAdd)
      addSuccessMess('chủ đề')
    } else {
      const dataEdit: ITopic = {
        id: topicItem.id,
        name: getValues('topic_name'),
        slug: getValues('topic_slug'),
        quantity: '10'
      }
      editTopic(dataEdit)
      updateSuccessMess('chủ đề')
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
            <p className='text-[24px] font-semibold'>{topicItem?.id ? 'Cập nhật chủ đề' : 'Thêm chủ đề'}</p>
          </div>
          <div>
            <button className='text-white bg-primary px-3 rounded h-[32px] mt-2' onClick={handleClickButton}>
              {topicItem?.id ? 'Cập nhật' : 'Lưu'}
            </button>
          </div>
        </div>
        <div className='w-full flex gap-8 bg-white  my-5 p-3 border border-[#E3E5E8] rounded'>
          <div className='w-[50%]'>
            <div className='flex'>
              <p>Tên chủ đề</p>
              <p className='text-red-600'>*</p>
            </div>
            <input className='w-full h-[32px] mt-2' defaultValue={topicItem?.name} {...register('topic_name')} />
          </div>
          <div className='w-[50%]'>
            <div className='flex'>
              <p>Slug</p>
              <p className='text-red-600'>*</p>
            </div>

            <input className='w-full h-[32px] mt-2' defaultValue={topicItem?.slug} {...register('topic_slug')} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default CreateTopic
