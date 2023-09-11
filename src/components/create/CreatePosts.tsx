import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdArrowBackIos } from 'react-icons/md'
import '../../css/custom.css'
const CreatePosts = () => {
  return (
    <>
      <div className='w-full bg-[#F0F6FF] h-screen p-4'>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center  mb-4'>
            <MdArrowBackIos />
            <p className='font-semibold text-[24px]'>Bài viết mới</p>
          </div>
          <div className='flex'>
            <div className='flex justify-center items-center h-[32px] border border-[#9D9D9D] rounded bg-[#C8CBD1] mr-3 px-2'>
              <AiOutlineCheck />
              <p className='ml-1'>Puslish</p>
            </div>
            <div className='flex justify-center items-center h-[32px] border border-[#D 9D9D9] rounded bg-[#186E25] px-2'>
              <p className='text-white'>Lưu bài viết</p>
            </div>
          </div>
        </div>
        <div className='flex gap-5 '>
          <div className='w-[80%] bg-white p-3'>
            <div className='flex gap-5'>
              <div className='w-[50%] '>
                <div className='flex '>
                  <p>Tên bài viết</p>
                  <p className='text-red-600 ml-1'> *</p>
                </div>
                <textarea className='h-[85px] border border-[#9D9D9D] w-full  px-2  ' />
              </div>
              <div className='w-[50%] '>
                <div className='flex'>
                  <p>Mô tả</p>
                  <p className='text-red-600 ml-1'> *</p>
                </div>
                <textarea className='h-[85px] border border-[#9D9D9D] w-full  px-2  ' />
              </div>
            </div>
            <div>
              <div className='flex'>
                <p>Nội dung</p>
                <p className='text-red-600 ml-1'>*</p>
              </div>
              <div>
                <CKEditor editor={ClassicEditor} data='<p>Hello from CKEditor&nbsp;5!</p>' />
              </div>
            </div>
            <div className='flex gap-5 my-3'>
              <div className='w-[50%]'>
                <p>Slug</p>
                <input className='w-full  h-[35px]' />
              </div>
              <div className='w-[50%]'>
                <p>Ảnh</p>
                <div className='w-full border border-[#9D9D9D] h-[70px] rounded'></div>
              </div>
            </div>
          </div>
          <div className='w-[20%] bg-white  p-3'>
            <p className='font-bold'>Thông tin</p>
            <div className='my-2'>
              <p>Chủ đề </p>
              <input className='w-full h-[32px]' />
            </div>
            <div className='mb-2'>
              <p>Tác giả </p>
              <input className='w-full h-[32px]' />
            </div>
            <div className='mb-2'>
              <p>Tag </p>
              <input className='w-full h-[32px]' />
            </div>
            <div className='mb-2'>
              <p>Ngày viết </p>
              <input className='w-full h-[32px]' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreatePosts
