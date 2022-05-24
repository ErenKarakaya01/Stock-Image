import { createContext, Dispatch, SetStateAction } from "react"


interface Authenticate {
  isAuth?: boolean,
  setIsAuth?: Dispatch<SetStateAction<boolean>>
}

export default createContext<Authenticate>({})