import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { PiCards } from 'react-icons/pi'

interface IAction {
  onDelete?: () => void
  onEdit?: () => void
}
const Action = (props: IAction) => {
  const { onDelete, onEdit } = props
  return (
    <>
      <div className='flex gap-2'>
        <div className='cursor-pointer'>
          <PiCards />
        </div>
        <div className='cursor-pointer' onClick={onEdit}>
          <FiEdit style={{ color: 'green' }} />
        </div>
        <div className='cursor-pointer hover:text-red-500' onClick={onDelete}>
          <BsTrash style={{ color: 'red' }} />
        </div>
      </div>
    </>
  )
}
export default Action
