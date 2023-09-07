import { useEffect } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

import { getAll } from '~/api'
import images from '~/assets/images'
import { deletePost, setDataPost } from '~/redux/features/PostsSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
const PostsTable = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await getAll('posts')
        dispatch(setDataPost(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }, [])
  const dataPosts = useAppSelector((state) => state.posts.posts)
  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId))
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
            {dataPosts.map((item) => (
              <tr key={item.id}>
                <th>
                  <input type='checkbox' />
                </th>
                <td className='text-center'>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>{item.topic}</td>
                <td>{item.posting_date}</td>
                <td className='' onClick={() => handleDeletePost(item.id)}>
                  <div>
                    <img src={images.Cards} />
                  </div>
                  <div>
                    <img src={images.NotePencil} />
                  </div>
                  <div>
                    <img src={images.Trash} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default PostsTable
