import { createContext, Dispatch, SetStateAction } from "react"


interface Authenticate {
  isAuth?: boolean | null,
  setIsAuth?: Dispatch<SetStateAction<boolean | null>>
}

export default createContext<Authenticate>({})