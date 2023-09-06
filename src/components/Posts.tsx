import Filter from './Filter'
import TitleTable from './TitleTable'

const Posts = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Danh sách bài viết' nameButton='Bài viết mới' />
          <Filter />
        </div>
      </div>
    </>
  )
}
export default Posts
