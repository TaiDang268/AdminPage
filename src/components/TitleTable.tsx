import images from '~/assets/images'

interface ITitleTable {
  title: string
  nameButton: string
}
const TitleTable = (props: ITitleTable) => {
  const { title, nameButton } = props
  return (
    <>
      <div className='w-full'>
        <div className='flex justify-between'>
          <p className='font-semibold text-[24px]'>{title}</p>
          <div className='h-[32px] w-[130px] bg-[#186E25] rounded flex justify-center items-center'>
            <img src={images.Add} />
            <p className='ml-2 text-white cursor-pointer'>{nameButton}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default TitleTable
