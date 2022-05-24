import { createContext, Dispatch } from "react"

interface User {
  user?: any,
  setUser?: Dispatch<any>
}

export default createContext<User>({})
