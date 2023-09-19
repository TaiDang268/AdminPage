import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import ReactPaginate from 'react-paginate'

import Select from './Select'
interface IPaginationCustom {
  pageCount: number
  onPageChange?: ({ selected }: { selected: number }) => void
}
const PaginationCustom = (props: IPaginationCustom) => {
  const { pageCount, onPageChange } = props
  return (
    <>
      <div className='w-full '>
        <div className='w-full  bg-[#E3E5E8] rounded-b px-3 flex justify-between items-center'>
          <Select />
          <ReactPaginate
            className='flex justify-end py-2   '
            pageClassName=' w-[30px] h-[30px] bg-white  text-[20px] text-gray-700  border border-[#D5D8DD]'
            pageLinkClassName='flex justify-center items-center w-full h-full'
            activeClassName='bg-green-700'
            activeLinkClassName='text-white flex '
            breakLabel='...'
            previousLabel={<IoIosArrowBack style={{ color: 'black' }} />}
            nextLabel={<IoIosArrowForward style={{ color: 'black' }} />}
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            nextClassName='  bg-white  w-[30px] h-[30px] flex justify-center items-center  text-[20px] text-white border border-[#D5D8DD] '
            previousClassName='bg-white  w-[30px] h-[30px] flex justify-center items-center  text-[20px] text-white border border-[#D5D8DD]  '
            disabledClassName=''
            previousLinkClassName='flex justify-center items-center w-full h-full'
            nextLinkClassName='flex justify-center items-center w-full h-full'
            renderOnZeroPageCount={null}
            initialPage={0}
          />
        </div>
      </div>
    </>
  )
}
export default PaginationCustom
