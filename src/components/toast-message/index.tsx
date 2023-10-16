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
export const loginSuccessMess = (name: string) => {
  toast.success(`Xin chào ${name}`, {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const registerSuccess = () => {
  toast.success(`Tạo tài khoản thành công`, {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const registerError = () => {
  toast.error(`Có lỗi xảy ra`, {
    position: toast.POSITION.TOP_RIGHT
  })
}
export const addForAdmin = () => {
  toast.success(`Tạo thành công, vui lòng đợi quản trị viên kiểm duyệt!`, {
    position: toast.POSITION.TOP_RIGHT
  })
}
