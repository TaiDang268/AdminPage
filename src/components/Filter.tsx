import images from '~/assets/images'

const Filter = () => {
  return (
    <>
      <div className='w-full mt-4'>
        <div className='flex justify-between'>
          <div className='flex'>
            <div className='border border-[#9D9D9D] rounded h-[32px] w-[32px] flex items-center justify-center mr-4 cursor-pointer'>
              <img src={images.Search} />
            </div>
            <div className='border border-[#9D9D9D] rounded h-[32px] w-[84px] flex items-center justify-center cursor-pointer '>
              <img src={images.FilterOption} />
              <p>Bộ lọc </p>
            </div>
          </div>
          <div className='border border-[#9D9D9D] rounded h-[32px] w-[87px] flex items-center justify-center cursor-pointer'>
            <img src={images.Sort} />
            <p>Sắp xếp</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Filter
