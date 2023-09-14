import { toast } from 'react-toastify'
export const deleteSuccessMess = () => {
  toast.success('Xóa thành công  !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const deleteErrorMess = () => {
  toast.success('Xóa thất bại  !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const addSuccessMess = (name: string) => {
  toast.success(`Thêm ${name} thành công !`, {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const addErrorMess = () => {
  toast.error('Thêm bài viết thất bại  !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const updateSuccessMess = (name: string) => {
  toast.success(`Cập nhật ${name} thành công !`, {
    position: toast.POSITION.TOP_RIGHT
  })
}
