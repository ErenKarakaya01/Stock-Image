import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"
import UserContext from "components/contexts/user"

const CustomerProtected = ({ children }: { children: any }) => {
  const { isAuth } = useContext(AuthenticateContext)
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    if (isAuth === null || user === null || user === undefined) return

    if (!isAuth) router.push("/login")
    else {
      setIsAuthLoaded(true)

      if (user.type !== "customer") router.push("/trades")
      else setIsUserLoaded(true)
    }
  }, [isAuth, user])

  if (!isAuthLoaded || !isUserLoaded) return null

  return <>{children}</>
}

export default CustomerProtected
