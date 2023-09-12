import { getByParams } from '~/api'
import { setDataPost } from '~/redux/features/PostsSlice'
import { useAppDispatch } from '~/redux/hooks'

import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import PostsTable from './tables/PostsTable'

const Posts = () => {
  const dispatch = useAppDispatch()

  const handlePageChange = ({ selected }: { selected: number }) => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParams('posts', { _page: selected + 1, _limit: 10 })
        dispatch(setDataPost(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Danh sách bài viết' nameButton='Bài viết mới' navigateTo='create_posts' />
          <Filter />
          <PostsTable />
          <Pagination pageCount={4} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}
export default Posts
