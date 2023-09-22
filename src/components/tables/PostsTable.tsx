import { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { Theme } from '~/hooks/useContext'
import { setDataPost } from '~/redux/features/PostsSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { useDeletePostsMutation, useGetPostsQuery } from '~/rtk-query/posts.service'
import { IPosts } from '~/types/interfaces'

import Action from '../common/Action'
import EditPost from '../edit/EditPost'
import DeleteModal from '../notification/DeleteConfirm'
import { deleteErrorMess, deleteSuccessMess } from '../toast-message'
interface IPostTable {
  currentPage: number
}
const PostsTable = ({ currentPage }: IPostTable) => {
  const dispatch = useAppDispatch()
  const dataPosts = useAppSelector((state) => state.posts.posts)
  const { perPage } = useContext(Theme)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditShow, setIsEditShow] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<IPosts | null>(null)
  const { data: postsResponse } = useGetPostsQuery({ _limit: perPage, _page: currentPage.toString() })
  const [deletePosts] = useDeletePostsMutation()
  useEffect(() => {
    if (postsResponse) {
      dispatch(setDataPost(postsResponse))
    }
  }, [dispatch, postsResponse])
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
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <thead>
            <tr className='text-white bg-primary'>
              <th className='th-checkbox'>
                <input type='checkbox' />
              </th>
              <th className='w-[60px] '>ID</th>
              <th className='w-[400px]'>Tên bài viết </th>
              <th>Mô tả </th>
              <th>Tác giả </th>
              <th>Chủ đề </th>
              <th className='w-[140px]'>Ngày đăng bài </th>
              <th>Thao tác </th>
            </tr>
          </thead>
          <tbody>
            {dataPosts?.map((item) => (
              <tr key={item.id}>
                <th>
                  <input type='checkbox' />
                </th>
                <td className='text-center'>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.short_desc}</td>
                <td>{item.author}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td className=''>
                  <div className='flex justify-center'>
                    <Action onDelete={() => handleClickTrash(item)} onEdit={() => handleClickEdit(item)} />
                  </div>
                </td>
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
