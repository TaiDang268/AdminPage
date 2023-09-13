import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const CreateTopic = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='w-full bg-[#F0F6FF] h-screen p-4'>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
            <div className='cursor-pointer' onClick={() => navigate(-1)}>
              <MdArrowBackIos />
            </div>
            <p className='text-[24px] font-semibold'>Chủ đề mới</p>
          </div>
          <div>
            <button className='text-white bg-primary px-3 rounded h-[32px] mt-2'>Lưu</button>
          </div>
        </div>
        <div className='w-full flex gap-8 bg-white  my-5 p-3'>
          <div className='w-[50%]'>
            <div className='flex'>
              <p>Tên chủ đề</p>
              <p className='text-red-600'>*</p>
            </div>
            <input className='w-full h-[32px] mt-2' />
          </div>
          <div className='w-[50%]'>
            <div className='flex'>
              <p>Slug</p>
              <p className='text-red-600'>*</p>
            </div>

            <input className='w-full h-[32px] mt-2' />
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateTopic
