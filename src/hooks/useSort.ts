import { sortAZ, sortZA } from '~/api'
import { useAppDispatch } from '~/redux/hooks'

export default function useSort(url: string, perPage: number, setState: any) {
  const dispatch = useAppDispatch()
  const handleSortAZ = async () => {
    try {
      const res = await sortAZ(url, perPage)
      dispatch(setState(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortZA = async () => {
    try {
      const res = await sortZA(url, perPage)
      dispatch(setState(res))
    } catch (err) {
      console.log(err)
    }
  }
  return { handleSortAZ, handleSortZA }
}
