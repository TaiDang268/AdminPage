import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import TagTable from './tables/TagTable'

const Tag = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Tag' nameButton='Thêm tag' />
          <Filter />
          <TagTable />
          <Pagination />
        </div>
      </div>
    </>
  )
}
export default Tag
