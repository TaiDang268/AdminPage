import { GrClose } from 'react-icons/gr'
interface IEditPosts {
  isShow?: boolean
  isClose?: () => void
}
const EditPosts = (props: IEditPosts) => {
  const { isShow, isClose } = props
  return (
    <>
      {isShow && (
        <>
          <div className='w-screen h-screen z-40 bg-[#2f2c2c] opacity-60 '></div>

          <div
            className='w-[450px] h-[200px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 
       border border-gray-500 bg-white rounded-lg px-4 '
          >
            <p className='font-bold my-4'> Bạn chắc chắn muốn xóa?</p>

            <button className='fixed right-5 top-5' onClick={isClose}>
              <GrClose />
            </button>
            <div className='fixed right-5 bottom-5'>
              <button className='rounded border  px-3 py-1' onClick={isClose}>
                Thoát
              </button>
              <button className='text-white bg-red-500  rounded px-3 py-1 ml-4'>Cập nhật</button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default EditPosts
