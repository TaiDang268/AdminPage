import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import AuthorTable from './tables/AuthorTable'

const Author = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Tác giả' nameButton='Thêm tác giả' navigateTo='create_author' />
          <Filter />
          <AuthorTable />
          <Pagination pageCount={3} />
        </div>
      </div>
    </>
  )
}
export default Author
