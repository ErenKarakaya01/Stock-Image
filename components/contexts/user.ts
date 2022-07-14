import { createContext, Dispatch, SetStateAction } from "react"

interface UserModal {
  id: number,
  name: string,
  surname: string,
  email: string,
  type: "customer" | "creator"
  created_at: string
  balance?: number
}

interface User {
  user?: UserModal | null,
  setUser?: Dispatch<SetStateAction<UserModal | null>>
}

export default createContext<User>({})
