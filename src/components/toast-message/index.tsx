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
export const addSuccessMess = () => {
  toast.success('Thêm bài viết thành công  !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const addErrorMess = () => {
  toast.error('Thêm bài viết thất bại  !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const updateSuccessMess = () => {
  toast.success('Cập nhật bài viết thành công !', {
    position: toast.POSITION.TOP_RIGHT
  })
}
