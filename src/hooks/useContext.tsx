import { createContext, useState } from 'react'

interface IUseContext {
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  idDelete: string
  setIdDelete: React.Dispatch<React.SetStateAction<string>>
  reset?: () => void
}
export const Theme = createContext<IUseContext>({
  toggle: false,
  setToggle: () => null,
  idDelete: '',
  setIdDelete: () => null
})

export const ProviderContext = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [idDelete, setIdDelete] = useState<string>('')

  return <Theme.Provider value={{ toggle, setToggle, idDelete, setIdDelete }}>{children}</Theme.Provider>
}
