import { toast } from 'react-toastify'
export const deleteSuccessMess = () => {
  toast.success('Delete Success  !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
