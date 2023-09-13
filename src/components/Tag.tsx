import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import TagTable from './tables/TagTable'

const Tag = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Tag' nameButton='Thêm tag' navigateTo='create_tag' />
          <Filter />
          <TagTable />
          <Pagination pageCount={3} />
        </div>
      </div>
    </>
  )
}
export default Tag
