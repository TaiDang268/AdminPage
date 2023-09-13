import { useState } from 'react'
import { GrClose } from 'react-icons/gr'

const DeleteWarning = () => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <>
      {open && (
        <div>
          <div className='w-screen h-screen z-40 bg-[#2f2c2c] opacity-60 '></div>

          <div
            className='w-[600px] h-[350px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 
       border border-gray-500 bg-white rounded-lg px-4 '
          >
            <p className='font-bold my-4 text-[24px]'> Bạn chắc chắn muốn xóa?</p>
            <div className='grid grid-cols-[150px,auto]  gap-4'></div>
            <button className='fixed right-5 top-5' onClick={() => setOpen(false)}>
              <GrClose />
            </button>
            <div className='fixed right-5 bottom-5'>
              <button className='rounded border  px-3 py-1' onClick={() => setOpen(false)}>
                Thoát
              </button>
              <button className='text-white bg-red-500  rounded px-3 py-1 ml-4'>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default DeleteWarning
