import { useNavigate } from 'react-router-dom'

import images from '../../assets/images'

interface ITitleTable {
  title: string
  nameButton: string
  navigateTo: string
}
const TitleTable = (props: ITitleTable) => {
  const navigate = useNavigate()
  const { title, nameButton, navigateTo } = props
  const handleOnClick = () => {
    navigate(navigateTo)
  }
  return (
    <>
      <div className='w-full cursor-pointer'>
        <div className='flex justify-between' onClick={handleOnClick}>
          <p className='font-semibold text-[24px]'>{title}</p>
          <div className='h-[32px] min-w-[130px] bg-[#186E25] rounded flex justify-center items-center'>
            <img src={images.Add} />
            <p className='ml-2 text-white cursor-pointer'>{nameButton}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default TitleTable
