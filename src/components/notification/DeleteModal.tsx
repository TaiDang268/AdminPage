import { GrClose } from 'react-icons/gr'
interface IDeleteModal {
  entityShow?: any
  isShow?: boolean
  isClose?: () => void
  handleClickOk?: () => void
}
const DeleteModal = (props: IDeleteModal) => {
  const { entityShow, isShow, isClose, handleClickOk } = props

  return (
    <>
      {isShow && (
        <>
          <div className='w-screen h-screen z-40 bg-[#2f2c2c] opacity-60 '></div>

          <div
            className='w-[450px] h-[200px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 
       border border-gray-500 bg-white rounded-lg px-4 '
          >
            <p className='font-bold my-4'> Are you sure you want delete this?</p>
            <p>{entityShow?.name}</p>
            <p>{entityShow?.description}</p>
            <p>{entityShow?.author}</p>
            <p>{entityShow?.topic}</p>
            <p>{entityShow?.posting_date}</p>
            <button className='fixed right-5 top-5' onClick={isClose}>
              <GrClose />
            </button>
            <div className='fixed right-5 bottom-5'>
              <button className='rounded border  px-3 py-1' onClick={isClose}>
                Cancel
              </button>
              <button className='text-white bg-red-500  rounded px-3 py-1 ml-4' onClick={handleClickOk}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default DeleteModal
