import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import TopicTable from './tables/TopicTable'

const Topic = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Chủ đề' nameButton='Thêm chủ đề' />
          <Filter />
          <TopicTable />
          <Pagination />
        </div>
      </div>
    </>
  )
}
export default Topic