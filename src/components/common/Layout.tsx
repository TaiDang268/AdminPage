import SideBar from './SideBar'

interface IPropsMain {
  children?: React.ReactNode
}
const Layout = ({ children }: IPropsMain) => {
  return (
    <div className='flex'>
      <SideBar />
      <main className='w-full'>{children}</main>
    </div>
  )
}
export default Layout
