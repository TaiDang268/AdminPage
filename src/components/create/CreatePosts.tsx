import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import SelectNpm from 'react-select'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdArrowBackIos } from 'react-icons/md'
import '../../css/custom.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { getNameForSelect, postPosts } from '~/api'
import images from '~/assets/images'
import { getCurrentDate } from '~/constant/getCurrentDate'
import { getCurrentTime } from '~/constant/getCurrentTime'
import { IPosts } from '~/types/interfaces'

import { addErrorMess, addSuccessMess } from '../toast-message'
const CreatePosts = () => {
  const navigate = useNavigate()
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [textCkEditor, setTextCkEditor] = useState<string>('0')
  const [lastId, setLastId] = useState<string>('')
  const [tagsName, setTagsName] = useState<string[]>([''])
  const [authorName, setAuthorName] = useState<string[]>([''])
  const [topicName, setTopicName] = useState<string[]>([''])
  const [selectedImage, setSelectedImage] = useState<string>('')

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
  useEffect(() => {
    const fetchData = async () => {
      const resTag = await getNameForSelect('tags')
      const resTopic = await getNameForSelect('topics')
      const resAuthor = await getNameForSelect('authors')
      setTagsName(resTag)
      setAuthorName(resAuthor)
      setTopicName(resTopic)
    }
    fetchData()
  }, [])
  const handleFileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const fileName = e.target.files[0]?.name || ''
    setSelectedImage(fileName)
  }
  const handleClickSave = async () => {
    const data: IPosts = {
      id: (Number(lastId) + 1).toString(),
      author: getValues('author'),
      image: getValues('image'),
      category: getValues('category'),
      date: getCurrentDate(),
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
              onClick={handleSubmit(handleClickSave)}
            >
              <p className='text-white'>Lưu bài viết</p>
            </div>
          </div>
        </div>
        <div className='flex gap-5 '>
          <div className='flex-1 bg-white p-3 border border-[#E3E5E8] rounded'>
            <div className='flex gap-5'>
              <div className='w-[50%] '>
                <div className='flex '>
                  <p>Tên bài viết</p>
                  <p className='text-red-600 ml-1'> *</p>
                </div>
                <textarea
                  className='h-[85px] border border-[#9D9D9D] w-full  px-2  '
                  {...register('name', { required: true })}
                />
                {errors.name && <p className='text-red-500'>Không được để trống trường này</p>}
              </div>
              <div className='w-[50%] '>
                <div className='flex'>
                  <p>Mô tả</p>
                  <p className='text-red-600 ml-1'> *</p>
                </div>
                <textarea
                  className='h-[85px] border border-[#9D9D9D] w-full  px-2  '
                  {...register('short_desc', { required: true })}
                />
                {errors.short_desc && <p className='text-red-500'>Không được để trống trường này</p>}
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
                <div className='border border-[#9D9D9D] h-[80px] rounded flex justify-center items-center'>
                  <label htmlFor='inputTag' className='cursor-pointer flex flex-col justify-center items-center '>
                    <img src={images.UploadImage} />
                    <input
                      id='inputTag'
                      type='file'
                      className='w-full border border-[#9D9D9D] rounded h-[70px] hidden'
                      {...register('image')}
                      onChange={handleFileImgChange}
                    />
                    <p className='text-center'>Click để tải ảnh</p>
                    <p className='text-green-600'>{selectedImage}</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[320px] h-[350px] bg-white  p-3 border border-[#E3E5E8] rounded'>
            <p className='font-bold'>Thông tin</p>
            <div className='my-2'>
              <p className='mb-1'>Chủ đề </p>
              <select
                className='w-full h-[32px]  border border-[#9D9D9D] rounded font-semibold'
                {...register('title', { required: true })}
              >
                {topicName.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.title && <p className='text-red-500'>Không được để trống trường này</p>}
            </div>
            <div className='mb-2'>
              <p className='mb-1'>Tác giả </p>
              <select
                className='w-full h-[32px]  border border-[#9D9D9D] rounded font-semibold'
                {...register('author', { required: true })}
              >
                {authorName.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.author && <p className='text-red-500'>Không được để trống trường này</p>}
            </div>
            <div className='mb-2'>
              <p className='mb-1'>Tag </p>
              <SelectNpm
                className=''
                options={tagsName.map((item) => ({ value: item, label: item }))}
                isMulti={true}
                {...register('category', { required: true })}
              />
              {/* <select
                className='w-full h-[32px]  border border-[#9D9D9D] rounded font-semibold'
                {...register('category', { required: true })}
              >
                {tagsName.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select> */}
              {errors.category && <p className='text-red-500'>Không được để trống trường này</p>}
            </div>
            <div className='mb-2 flex justify-between'>
              <p>Ngày viết: </p>
              <div className='flex'>
                <p className='font-semibold mr-2'>{getCurrentTime()}</p>
                <p className='font-semibold'>{getCurrentDate()}</p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default CreatePosts
