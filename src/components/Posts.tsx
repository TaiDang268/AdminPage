import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import PostsTable from './tables/PostsTable'

const Posts = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Danh sách bài viết' nameButton='Bài viết mới' navigateTo='create_posts' />
          <Filter />
          <PostsTable />
          <Pagination />
        </div>
      </div>
    </>
  )
}
export default Posts
