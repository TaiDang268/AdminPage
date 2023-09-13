import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const CreateTag = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='w-full bg-[#F0F6FF] h-screen p-4'>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
            <div className='cursor-pointer' onClick={() => navigate(-1)}>
              <MdArrowBackIos />
            </div>
            <p className='text-[24px] font-semibold'>Tag mới</p>
          </div>
          <div>
            <button className='text-white bg-primary px-3 rounded h-[32px]'>Lưu</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateTag
