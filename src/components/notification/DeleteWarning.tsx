import { useContext } from 'react'
import { GrClose } from 'react-icons/gr'

import { Theme } from '~/hooks/useContext'

interface IDeleteWarning {
  handleDelete: (id: string) => void
}
const DeleteWarning = ({ handleDelete }: IDeleteWarning) => {
  const { setToggle, idDelete } = useContext(Theme)
  return (
    <>
      <div>
        <div className='w-screen h-screen z-40 bg-[#2f2c2c] opacity-60 '></div>

        <div
          className='w-[400px] h-[200px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 
       border border-gray-500 bg-white rounded-lg px-4 '
        >
          <p className='font-bold my-4 text-[24px]'> Bạn chắc chắn muốn xóa?</p>
          <div className='grid grid-cols-[150px,auto]  gap-4'></div>
          <button className='fixed right-5 top-5' onClick={() => setToggle(false)}>
            <GrClose />
          </button>
          <div className='fixed right-5 bottom-5'>
            <button className='rounded border  px-3 py-1' onClick={() => setToggle(false)}>
              Thoát
            </button>

            <button
              className='text-white bg-red-500  rounded px-3 py-1 ml-4'
              onClick={() => {
                handleDelete(idDelete), setToggle(false)
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default DeleteWarning
