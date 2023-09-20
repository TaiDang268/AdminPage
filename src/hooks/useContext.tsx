import { createContext, useState } from 'react'

interface IUseContext {
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  idDelete: string
  setIdDelete: React.Dispatch<React.SetStateAction<string>>
  perPage: string
  setPerPage: React.Dispatch<React.SetStateAction<string>>
  reset?: () => void
}
export const Theme = createContext<IUseContext>({
  toggle: false,
  setToggle: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => null,
  idDelete: '',
  setIdDelete: () => null,
  perPage: '',
  setPerPage: () => null
})

export const ProviderContext = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [idDelete, setIdDelete] = useState<string>('')
  const [perPage, setPerPage] = useState<string>('5')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  return (
    <Theme.Provider
      value={{ toggle, setToggle, idDelete, setIdDelete, perPage, setPerPage, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </Theme.Provider>
  )
}
