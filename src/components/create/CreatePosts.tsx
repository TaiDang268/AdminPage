import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdArrowBackIos } from 'react-icons/md'
import '../../css/custom.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { postPosts } from '~/api'
import { IPosts } from '~/types/interfaces'

import { addErrorMess, addSuccessMess } from '../toast-message'
const CreatePosts = () => {
  const navigate = useNavigate()
  const { register, getValues } = useForm()
  const [textCkEditor, setTextCkEditor] = useState<string>('0')
  const [lastId, setLastId] = useState<string>('')
  useEffect(() => {
    axios
      .get('http://localhost:3007/posts')
      .then((resp) => {
        const last = resp.data.length
        setLastId(resp.data[last - 1].id)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleClickSave = async () => {
    const data: IPosts = {
      id: (Number(lastId) + 1).toString(),
      author: getValues('author'),
      image: getValues('image'),
      category: getValues('category'),
      date: getValues('date'),
      title: getValues('title'),
      description: textCkEditor,
      name: getValues('name'),
      short_desc: getValues('short_desc')
    }
    try {
      await postPosts('posts', data)
      addSuccessMess('bài viết')
    } catch (err) {
      console.log(err)
      addErrorMess()
    }
  }
  return (
    <>
      <div className='w-full bg-[#F0F6FF] h-screen p-4'>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center  mb-4'>
            <div className='cursor-pointer' onClick={() => navigate(-1)}>
              <MdArrowBackIos />
            </div>
            <p className='font-semibold text-[24px]'>Bài viết mới</p>
          </div>
          <div className='flex'>
            <div className='flex justify-center items-center h-[32px] border border-[#9D9D9D] rounded bg-[#C8CBD1] mr-3 px-2'>
              <AiOutlineCheck />
              <p className='ml-1'>Puslish</p>
            </div>
            <div
              className='flex justify-center items-center h-[32px] border border-[#D 9D9D9] rounded bg-[#186E25] px-2 cursor-pointer'
              onClick={handleClickSave}
            >
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
                <textarea className='h-[85px] border border-[#9D9D9D] w-full  px-2  ' {...register('name')} />
              </div>
              <div className='w-[50%] '>
                <div className='flex'>
                  <p>Mô tả</p>
                  <p className='text-red-600 ml-1'> *</p>
                </div>
                <textarea className='h-[85px] border border-[#9D9D9D] w-full  px-2  ' {...register('short_desc')} />
              </div>
            </div>
            <div>
              <div className='flex'>
                <p>Nội dung</p>
                <p className='text-red-600 ml-1'>*</p>
              </div>
              <div>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    setTextCkEditor(editor.getData())
                    console.log(event)
                  }}
                />
              </div>
            </div>
            <div className='flex gap-5 my-3'>
              <div className='w-[50%]'>
                <p>Slug</p>
                <input className='w-full  h-[35px]' />
              </div>
              <div className='w-[50%]'>
                <p>Ảnh</p>
                <textarea className='w-full border border-[#9D9D9D] h-[70px] rounded' {...register('image')}></textarea>
              </div>
            </div>
          </div>
          <div className='w-[20%] bg-white  p-3'>
            <p className='font-bold'>Thông tin</p>
            <div className='my-2'>
              <p>Chủ đề </p>
              <input className='w-full h-[32px]' {...register('title')} />
            </div>
            <div className='mb-2'>
              <p>Tác giả </p>
              <input className='w-full h-[32px]' {...register('author')} />
            </div>
            <div className='mb-2'>
              <p>Tag </p>
              <input className='w-full h-[32px]' {...register('category')} />
            </div>
            <div className='mb-2'>
              <p>Ngày viết </p>
              <input className='w-full h-[32px]' {...register('date')} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default CreatePosts
