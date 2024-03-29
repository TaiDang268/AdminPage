import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { useAppSelector } from '~/redux/hooks'
import { useDeletePostsMutation } from '~/rtk-query/posts.service'
import { IPosts } from '~/types/interfaces'

import Action from '../common/Action'
import EditPost from '../edit/EditPost'
import DeleteModal from '../notification/DeleteConfirm'
import { deleteErrorMess, deleteSuccessMess } from '../toast-message'
import { useNavigate } from 'react-router-dom'
interface IPostsTable {
  selectedListItem: string[]
  setSelectedListItem: Dispatch<SetStateAction<string[]>>
}
const PostsTable = (props: IPostsTable) => {
  const { selectedListItem, setSelectedListItem } = props
  const dataPosts = useAppSelector((state) => state.posts.posts)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditShow, setIsEditShow] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<IPosts | null>(null)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [deletePosts] = useDeletePostsMutation()
  const navigate = useNavigate()
  const handleClickTrash = (item: IPosts) => {
    setIsModalOpen(true)
    setSelectedItem(item)
  }
  const handleClickDelete = async (postId: string) => {
    try {
      await deletePosts(postId)
      setIsModalOpen(false)
      deleteSuccessMess()
    } catch (err) {
      deleteErrorMess()
      console.log(err)
    }
  }
  const handleClickEdit = (item: IPosts) => {
    setIsEditShow(true)
    setSelectedItem(item)
  }
  const handleChangeInput = (checked: boolean, id: string) => {
    if (checked) {
      const item = selectedListItem.find((item) => item === id)
      if (!item) {
        setSelectedListItem((prev) => [...prev, id])
      }
    } else {
      const list = selectedListItem.filter((item) => item !== id)
      setSelectedListItem(list)
    }
  }
  useEffect(() => {
    if (checkAll) {
      const listInput = inputRefs.current
      if (listInput) {
        listInput.forEach((item) => {
          if (item) item.checked = true
        })
      }
      setSelectedListItem([])
      dataPosts.forEach((item) => {
        setSelectedListItem((prev) => [...prev, item.id])
      })
    } else {
      const listInput = inputRefs.current
      if (listInput) {
        listInput.forEach((item) => {
          if (item) item.checked = false
        })
      }
      setSelectedListItem([])
    }
  }, [checkAll])
  let userObject: any
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    userObject = JSON.parse(storedUser)
  } else {
    console.log('Không tìm thấy thông tin người dùng trong localStorage')
  }
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <thead>
            <tr className='text-white bg-primary'>
              <th className='th-checkbox'>
                <input type='checkbox' checked={checkAll} onChange={() => setCheckAll(!checkAll)} />
              </th>
              <th className='w-[60px] '>ID</th>
              <th className='w-[400px]'>Tên bài viết </th>
              <th>Mô tả </th>
              <th>Tác giả </th>
              <th>Chủ đề </th>
              <th className='w-[140px]'>Ngày đăng bài </th>
              {userObject?.role.toLowerCase() === 'admin' ? <th>Thao tác </th> : ''}
            </tr>
          </thead>
          <tbody>
            {dataPosts?.map((item: IPosts, index) => (
              <tr key={item.id} className='cursor-pointer'>
                <th>
                  <input
                    type='checkbox'
                    onChange={(e) => handleChangeInput(e.target.checked, item.id)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </th>
                <td className='text-center'>{item.id}</td>
                <td onClick={() => navigate('/readpost', { state: item.id })}>{item.name}</td>
                <td>{item.short_desc}</td>
                <td>{item.author}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                {userObject?.role.toLowerCase() === 'admin' ? (
                  <td className=''>
                    <div className='flex justify-center'>
                      <Action onDelete={() => handleClickTrash(item)} onEdit={() => handleClickEdit(item)} />
                    </div>
                  </td>
                ) : (
                  ''
                )}
                {}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='fixed top-0 right-0'>
          <DeleteModal
            entityShow={selectedItem}
            isShow={isModalOpen}
            isClose={() => setIsModalOpen(false)}
            handleClickOk={() => selectedItem && handleClickDelete(selectedItem.id)}
          />
        </div>
        <div className='fixed top-0 right-0'>
          <EditPost
            key={selectedItem?.id}
            isShow={isEditShow}
            isClose={() => setIsEditShow(false)}
            itemEdit={selectedItem}
            isCheckConfirm={() => setIsEditShow(false)}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default PostsTable
